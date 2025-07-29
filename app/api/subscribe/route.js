// app/api/subscribe/route.js

import { NextResponse } from "next/server";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/next";
import { isSpoofedBot } from "@arcjet/inspect";

const aj = arcjet({
  key: process.env.ARCJET_KEY, // Get your site key from https://app.arcjet.com
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:SOCIAL",
        "CATEGORY:META",
        "CATEGORY:AI",
        "CATEGORY:ADVERTISING",
        "CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW" // Link previews e.g. Slack, Discord
      ]
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10 // Bucket capacity of 10 tokens
    })
  ]
});

export async function POST(req) {
  // Arcjet protection: block bots, rate limit, and get IP (per Arcjet Next.js docs)
  const response = NextResponse.next();

  const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "No bots allowed", reason: decision.reason },
        { status: 403 }
      );
    } else {
      return NextResponse.json(
        { error: "Forbidden", reason: decision.reason },
        { status: 403 }
      );
    }
  }

  // Requests from hosting IPs are likely from bots, so they can usually be
  // blocked. However, consider your use case - if this is an API endpoint
  // then hosting IPs might be legitimate.
  // https://docs.arcjet.com/blueprints/vpn-proxy-detection
  if (decision.ip.isHosting()) {
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
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
    utm_term = ""
  } = body;

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
