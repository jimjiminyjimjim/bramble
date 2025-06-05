import { useState, useMemo, useEffect } from "react";
import { useTheme } from "@/helpers/theme";
import { parseMailchimpEmbed } from "@/helpers/mailchimpParser";
import cx from "classix";
import { sendGTMEvent } from "@next/third-parties/google";
import { useSearchParams, usePathname } from "next/navigation";

const getContrastTextColour = (color) => {
  // Accept hex, short-hex or rgb() — fall back to black.
  try {
    let r, g, b;

    if (color.startsWith("#")) {
      const hex = color.replace("#", "");
      const full =
        hex.length === 3
          ? hex
              .split("")
              .map((c) => c + c)
              .join("")
          : hex;
      r = parseInt(full.slice(0, 2), 16);
      g = parseInt(full.slice(2, 4), 16);
      b = parseInt(full.slice(4, 6), 16);
    } else if (color.startsWith("rgb")) {
      [r, g, b] = color
        .replace(/[^\d,]/g, "")
        .split(",")
        .map((n) => parseInt(n, 10));
    } else {
      return "#000";
    }

    // Perceived luminance formula (sRGB)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Anything under ~0.55 is “dark” → use white text
    return luminance < 0.55 ? "#fff" : "#000";
  } catch {
    return "#000";
  }
};

export function Mailchimp({
  placeholder = "Enter your email",
  // mailchimpFormCode,
  theme,
  CTA,
  mailchimpTags,
  ctaText,
  ctaColor,
  alignment = "left",
  stack = "column"
}) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const [pageTite, setPageTitle] = useState("");

  const initialSource = searchParams.get("utm_source") || "";
  const initialMedium = searchParams.get("utm_medium") || "";
  const initialCampaign = searchParams.get("utm_campaign") || "";

  const colors = useTheme(theme);

  const background = ctaColor || colors?.buttonColor || "#eeeeee";
  const textColour = useMemo(
    () => getContrastTextColour(background),
    [background]
  );

  useEffect(() => {
    setPageTitle(document?.title?.split("-")[0].trim() || "");
  }, []);

  const handleSubmit = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          tags: [
            pageTite,
            ...(mailchimpTags?.split(",").map((tag) => tag.trim()) || []),
            pathName
          ],
          utm_source: initialSource,
          utm_medium: initialMedium,
          utm_campaign: initialCampaign
        })
      });

      if (!response.ok) throw new Error("Failed to subscribe");

      setSubmitted(true);
      setEmail("");
      setError("");

      sendGTMEvent({
        event: "mailchimpInputSubmit",
        value: {
          source: initialSource,
          medium: initialMedium,
          campaign: initialCampaign
        }
      });
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div
      className={cx(
        "w-full max-w-600 flex",
        stack === "column" ? "flex-col max-w-[400px]" : "flex-row",
        alignment === "center" && "mx-auto"
      )}
    >
      <h5
        style={{ color: background }}
        className={cx(
          "font-bold text-[18px] sm:text-start lg:text-[21px] mb-4",
          alignment === "center" ? "text-center" : "text-left"
        )}
      >
        {CTA}
      </h5>
      <div
        className={cx(
          "flex gap-5",
          stack === "column" ? "flex-col" : "flex-row",
          alignment === "center" ? "text-center" : "text-left"
        )}
      >
        <input
          type="email"
          value={email}
          placeholder={placeholder}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-[2_2_0%] rounded-full px-4 py-2 border border-gray-300 h-full text-center"
        />
        <button
          onClick={handleSubmit}
          className="flex-[1_1_0%] btn h-full m-0"
          style={{ backgroundColor: background, color: textColour }}
        >
          {ctaText}
        </button>
      </div>

      {submitted && (
        <p className="text-green-600 text-sm mt-2">Thanks! Check your inbox.</p>
      )}
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}
