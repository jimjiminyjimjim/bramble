"use client";

import { cx } from "classix";
import { useEffect } from "react";

export const Button = ({ 
  children,
  text, // Builder.io sends button text as 'text' prop
  backgroundColor = "#3B82F6", 
  textColor = "#FFFFFF", 
  rounded = true, 
  maxWidth = "500px",
  className = "",
  onClick,
  type = "button",
  disabled = false,
  size = "medium",
  // Filter out Builder.io specific props
  openLinkInNewTab,
  link,
  ...props 
}) => {
  // Inject CSS to override Builder.io wrapper styles only

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
    if (onClick) {
      onClick(e);
    }
    
    if (link && !disabled) {
      if (openLinkInNewTab) {
        window.open(link, '_blank', 'noopener,noreferrer');
      } else {
        window.location.href = link;
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
      type={type === "button" || type === "submit" || type === "reset" ? type : "button"}
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
