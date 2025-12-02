"use client";

import { cx } from "classix";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export const Button = ({
  children,
  text, // Builder.io sends button text as 'text' prop
  backgroundColor = "#3B82F6",
  textColor = "#FFFFFF",
  rounded = true,
  maxWidth = "500px",
  className = "",
  tagManagerEvent,
  onClick, // External onClick prop
  type = "button",
  disabled = false,
  size = "medium",

  // Link navigation props
  url, // Builder.io URL prop
  linkType = "internal", // internal, external, or scrollTo

  // Filter out Builder.io specific props
  openLinkInNewTab,
  link,
  ...props
}) => {
  const router = useRouter();

  // Define size classes
  const getSizeClasses = (sizeType) => {
    switch (sizeType) {
      case "small":
        return "px-4 py-2 text-sm";
      case "large":
        return "px-8 py-4 text-lg";
      default: // medium
        return "px-6 py-3 text-base";
    }
  };

  const sizeClasses = getSizeClasses(size);

  // Use text prop from Builder.io or fallback to children
  const buttonContent = text || children || "Click Me";

  // Handle click events - navigate to URL if provided
  const handleClick = (e) => {
    // Use url prop first, fallback to legacy link prop
    const targetUrl = url || link;

    // Call external onClick if provided
    if (onClick) {
      onClick(e);
    }

    if (!disabled) {
      // Always send GTM event for all clicks (if tagManagerEvent is provided)
      if (tagManagerEvent) {
        const urlParams = new URLSearchParams(window.location.search);
        const initialSource =
          urlParams.get("utm_source") ||
          sessionStorage.getItem("utm_source") ||
          "";
        const initialMedium =
          urlParams.get("utm_medium") ||
          sessionStorage.getItem("utm_medium") ||
          "";
        const initialCampaign =
          urlParams.get("utm_campaign") ||
          sessionStorage.getItem("utm_campaign") ||
          "";

        sendGTMEvent({
          event: tagManagerEvent,
          value: {
            source: initialSource,
            medium: initialMedium,
            campaign: initialCampaign
          }
        });
      }

      // Handle URL navigation if provided
      if (targetUrl) {
        e.preventDefault();

        // Add delay to allow GTM event to be sent before navigation
        setTimeout(() => {
          switch (linkType) {
            case "external":
              window.open(targetUrl, "_blank", "noopener,noreferrer");
              break;
            case "scrollTo":
              // Add # if not present for scrollTo
              const scrollTarget = targetUrl.startsWith("#")
                ? targetUrl
                : `#${targetUrl}`;
              document
                .querySelector(scrollTarget)
                ?.scrollIntoView({ behavior: "smooth" });
              break;
            case "internal":
            default:
              router.push(targetUrl);
              break;
          }
        }, 100); // 100ms delay to allow GTM event to be sent
      }
    }
  };

  // Filter out any remaining Builder.io props that shouldn't be on DOM elements
  const {
    builderBlock,
    builderContext,
    builderComponents,
    builderLinkComponent,
    ...domProps
  } = props;

  return (
    <button
      type={
        type === "button" || type === "submit" || type === "reset"
          ? type
          : "button"
      }
      onClick={handleClick}
      disabled={disabled}
      className={cx(
        // Base styles
        "font-semibold transition-all duration-200 ease-in-out",
        "hover:scale-105 active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100",
        "border cursor-pointer",

        // Centering styles
        "mx-auto block",

        // Size styles
        sizeClasses,

        // Rounded styles - use rounded-full for true rounded
        rounded ? "rounded-full" : "rounded-none",

        // Text alignment
        "text-center",

        // Custom className
        className
      )}
      style={{
        backgroundColor: disabled ? "#9CA3AF" : backgroundColor,
        color: textColor,
        maxWidth: maxWidth === "auto" ? "auto" : maxWidth,
        borderColor: disabled ? "#9CA3AF" : backgroundColor,
        ...domProps.style
      }}
      {...domProps}
    >
      {buttonContent}
    </button>
  );
};

// Export as default for easy importing
export default Button;
