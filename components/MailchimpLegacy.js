// components/MailchimpLegacy.js
"use client";

import { useState, useMemo } from "react";
import { parseMailchimpEmbed } from "@/helpers/mailchimpParser";
import { useSearchParams } from "next/navigation";
import cx from "classix";
import { sendGTMEvent } from "@next/third-parties/google";
import { useTheme } from "@/helpers/theme";

const getContrastTextColour = (color) => {
  try {
    let r, g, b;
    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const full = hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex;
      r = parseInt(full.slice(0, 2), 16);
      g = parseInt(full.slice(2, 4), 16);
      b = parseInt(full.slice(4, 6), 16);
    } else if (color.startsWith("rgb")) {
      [r, g, b] = color.replace(/[^\d,]/g, "").split(",").map((n) => parseInt(n, 10));
    } else {
      return "#000";
    }
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance < 0.55 ? "#fff" : "#000";
  } catch {
    return "#000";
  }
};

export function MailchimpLegacy({ mailchimpFormCode, theme, placeholder, CTA, ctaText, ctaColor, alignment = "left", stack = "column" }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const initialSource = searchParams.get("utm_source") || "";
  const initialMedium = searchParams.get("utm_medium") || "";
  const initialCampaign = searchParams.get("utm_campaign") || "";

  const { host, u, id, tags, honeypot } = useMemo(() => parseMailchimpEmbed(mailchimpFormCode) ?? {}, [mailchimpFormCode]);

  const colors = useTheme(theme);
  const background = ctaColor || colors?.buttonColor || "#eeeeee";
  const textColour = useMemo(() => getContrastTextColour(background), [background]);

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    const url = `https://${host}/subscribe/post?u=${u}&id=${id}`;
    const data = new FormData();
    data.append("EMAIL", email);
    data.append("u", u);
    data.append("id", id);
    if (tags) data.append("tags", tags);
    if (honeypot) data.append(honeypot, "");

    try {
      await fetch(url, { method: "POST", mode: "no-cors", body: data });
      setSubmitted(true);
      setError("");
      setEmail("");
      sendGTMEvent({
        event: "mailchimpInputSubmit",
        value: { email, source: initialSource, medium: initialMedium, campaign: initialCampaign }
      });
    } catch (err) {
      console.error("Error submitting form", err);
      setError("Something went wrong – please try again.");
    }
  };

  return (
    <div className={cx("w-full max-w-600 flex", stack === "column" ? "flex-col max-w-[400px]" : "flex-row", alignment === "center" && "mx-auto")}>
      <h5 style={{ color: background }} className={cx("font-bold text-[18px] sm:text-start lg:text-[21px] mb-4", alignment === "center" ? "text-center" : "text-left")}>
        {CTA}
      </h5>
      <div className={cx("flex gap-5", stack === "column" ? "flex-col" : "flex-row", alignment === "center" ? "text-center" : "text-left")}>
        <input
          type="email"
          value={email}
          placeholder={placeholder}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-[2_2_0%] rounded-full px-4 py-2 border border-gray-300 h-full text-center"
        />
        <button onClick={handleSubmit} className="flex-[1_1_0%] btn h-full m-0" style={{ backgroundColor: background, color: textColour }}>
          {ctaText}
        </button>
      </div>
      {submitted && <p className="text-green-600 text-sm mt-2">Thanks! Check your inbox.</p>}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
