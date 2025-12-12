// app/api/subscribe/route.js

import { NextResponse } from "next/server";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";

const aj = arcjet({
  key: process.env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
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
});

export async function POST(req) {
  // Arcjet protection: block bots, rate limit, and get IP (per Arcjet Next.js docs)
  const response = NextResponse.next();

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

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const DATACENTER = API_KEY.split("-")[1]; // e.g. "us14"

  const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members/${Buffer.from(
    email.toLowerCase()
  ).toString("hex")}`;

  try {
    const res = await fetch(url, {
      method: "PUT", // creates or updates
      headers: {
        Authorization: `apikey ${API_KEY}`,
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
