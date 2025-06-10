// app/api/subscribe/route.js
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const {
    email,
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
        tags,
        merge_fields: {
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
