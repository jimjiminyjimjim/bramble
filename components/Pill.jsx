import React from "react";
import cx from "classix";

export function Pill({
  text = "Pill Text",
  size = "medium",
  alignment = "center",
  backgroundColor = "#3B82F6",
  textColor = "#FFFFFF",
  cornerStyle = "rounded",
  aspectRatio = null,
  margin = "none",
  className = "",
  ...props
}) {
  // Get margin classes
  const getMarginClasses = () => {
    switch (margin) {
      case "small":
        return "my-2";
      case "medium":
        return "my-4";
      case "large":
        return "my-8";
      case "none":
      default:
        return "";
    }
  };

  // Get corner style classes
  const getCornerClasses = () => {
    switch (cornerStyle) {
      case "square":
        return "rounded-none";
      case "rounded":
      default:
        return "rounded-full";
    }
  };

  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "px-3 py-1 text-xs";
      case "large":
        return "px-6 py-3 text-lg";
      default: // medium
        return "px-4 py-2 text-sm";
    }
  };

  // Get alignment classes
  const getAlignmentClasses = () => {
    switch (alignment) {
      case "left":
        return "flex justify-start";
      case "right":
        return "flex justify-end";
      case "center":
      default:
        return "flex justify-center";
    }
  };

  const pillStyle = {
    backgroundColor,
    color: textColor,
    ...(aspectRatio && { aspectRatio: aspectRatio }),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className={cx(getAlignmentClasses(), getMarginClasses(), className)}>
      <span
        className={cx(
          "inline-flex font-bold",
          getSizeClasses(),
          getCornerClasses()
        )}
        style={pillStyle}
        {...props}
      >
        {text}
      </span>
    </div>
  );
}
