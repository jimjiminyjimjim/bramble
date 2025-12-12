// app/api/subscribe/route.js

import { NextResponse } from "next/server";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";

// Validate environment variables at module load
const ARCJET_KEY = process.env.ARCJET_KEY;
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID;

// Only initialize Arcjet if key is available
const aj = ARCJET_KEY
  ? arcjet({
      key: ARCJET_KEY,
      rules: [
        // Shield protects your app from common attacks e.g. SQL injection
        shield({ mode: "LIVE" }),
        // Create a bot detection rule - only block VERIFIED bots (known bad actors)
        // This allows legitimate users from corporate networks through
        detectBot({
          mode: "LIVE",
          block: ["AUTOMATED"], // Only block automated/verified bad bots
          allow: [
            "CATEGORY:SEARCH_ENGINE",
            "CATEGORY:SOCIAL",
            "CATEGORY:META",
            "CATEGORY:AI",
            "CATEGORY:ADVERTISING",
            "CATEGORY:MONITOR",
            "CATEGORY:PREVIEW"
          ]
        }),
        // More lenient rate limiting - allows bursts but prevents abuse
        tokenBucket({
          mode: "LIVE",
          refillRate: 10, // Refill 10 tokens per interval
          interval: 60, // Refill every 60 seconds (1 minute)
          capacity: 20 // Bucket capacity of 20 tokens
        })
      ]
    })
  : null;

export async function POST(req) {
  // Validate required environment variables
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
    console.error("Missing required environment variables: MAILCHIMP_API_KEY or MAILCHIMP_LIST_ID");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Validate MAILCHIMP_API_KEY format (should contain datacenter suffix like "xxx-us14")
  if (!MAILCHIMP_API_KEY.includes("-")) {
    console.error("Invalid MAILCHIMP_API_KEY format - missing datacenter suffix");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }
  // Arcjet protection: block bots, rate limit, and get IP (per Arcjet Next.js docs)
  // Only run Arcjet if properly configured
  if (aj) {
    try {
      const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
      console.log("Arcjet decision", decision);
      console.log("Arcjet IP info:", {
        isHosting: decision.ip.isHosting(),
        isProxy: decision.ip.isProxy(),
        isVpn: decision.ip.isVpn(),
      });

      // Only block if rate limited or shield triggered
      // Bot detection with "AUTOMATED" block only triggers on verified bad bots
      if (decision.isDenied()) {
        console.error("Arcjet DENIED:", decision.reason);
        if (decision.reason.isRateLimit()) {
          return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            { status: 429 }
          );
        } else if (decision.reason.isBot()) {
          console.log("Bot detected and blocked:", decision.reason);
          return NextResponse.json(
            { error: "Request blocked" },
            { status: 403 }
          );
        } else if (decision.reason.isShield()) {
          console.log("Shield blocked malicious request:", decision.reason);
          return NextResponse.json(
            { error: "Request blocked" },
            { status: 403 }
          );
        } else {
          return NextResponse.json(
            { error: "Request blocked" },
            { status: 403 }
          );
        }
      }

      // Paid Arcjet accounts include additional verification checks using IP data.
      // Verification isn't always possible, so we recommend checking the decision
      // separately.
      // https://docs.arcjet.com/bot-protection/reference#bot-verification
      if (decision.results.some(isSpoofedBot)) {
        return NextResponse.json(
          { error: "Forbidden", reason: decision.reason },
          { status: 403 }
        );
      }
    } catch (arcjetError) {
      console.error("Arcjet error:", arcjetError);
      // Continue without Arcjet protection if it fails
    }
  } else {
    console.warn("Arcjet not configured - ARCJET_KEY environment variable missing");
  }

  const body = await req.json();
  const {
    email,
    name = "",
    tags = [],
    utm_source = "",
    utm_medium = "",
    utm_campaign = "",
    utm_content = "",
    utm_term = "",
    honeypot = "" // Client-side honeypot field
  } = body;

  // Honeypot check - bots typically fill this hidden field
  if (honeypot && honeypot.length > 0) {
    console.log("Honeypot triggered - bot detected");
    return NextResponse.json({ success: true }, { status: 200 }); // Silently succeed
  }

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // Use already-validated constants from module scope
  const DATACENTER = MAILCHIMP_API_KEY.split("-")[1]; // e.g. "us14"

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members/${Buffer.from(
    email.toLowerCase()
  ).toString("hex")}`;

  try {
    const res = await fetch(url, {
      method: "PUT", // creates or updates
      headers: {
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_address: email,
        status_if_new: "subscribed",
        tags: tags.filter(tag => tag && tag.length > 0),
        merge_fields: {
          ...(name && { FNAME: name }),
          SOURCE: utm_source,
          MEDIUM: utm_medium,
          CAMPAIGN: utm_campaign,
          CONTENT: utm_content,
          TERMS: utm_term
        }
      })
    });

    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error }, { status: res.status });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Mailchimp error", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
