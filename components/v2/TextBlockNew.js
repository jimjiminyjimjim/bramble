'use client'
import { anchorTags } from "@/helpers/anchorTags";
import React from "react";
import { useTheme } from "@/helpers/theme";
import { Blocks, BuilderBlock } from "@builder.io/sdk-react";
import { useRouter } from "next/navigation";
import { ClientHtmlContent } from "../ClientHtmlContent";

export function TextBlockNew({
  children,
  title,
  subtitle,
  body,
  anchor,
  siteData,
  coloumnTest,
  builderBlock,
  alignment = "left",
  verticalAlignment = "middle",
  textSize = "medium",
  useGradientText = false,
  gradientColor1 = "#3B82F6",
  gradientColor2 = "#8B5CF6",
  textColor = "#000000",
  subtitleBodyColor = "#000000",
  noPadding = true,
  url = "",
  linkType = "internal"
}) {
  const router = useRouter();
  
  // Handle title click navigation
  const handleTitleClick = (e) => {
    if (!url) return;
    
    e.preventDefault();
    
    switch (linkType) {
      case "external":
        window.open(url, '_blank', 'noopener,noreferrer');
        break;
      case "scrollTo":
        // Add # if not present for scrollTo
        const scrollTarget = url.startsWith('#') ? url : `#${url}`;
        document.querySelector(scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
        break;
      case "internal":
      default:
        router.push(url);
        break;
    }
  };
  
  // Define vertical alignment classes
  const getVerticalAlignmentClasses = (vAlign) => {
    switch (vAlign) {
      case "top":
        return "justify-start";
      case "bottom":
        return "justify-end";
      default: // middle
        return "justify-center";
    }
  };

  const verticalClasses = getVerticalAlignmentClasses(verticalAlignment);

  // Define text size classes and spacing based on the textSize prop
  const getTextSizes = (size) => {
    const gradientStyle = useGradientText
      ? {
          background: `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text"
        }
      : {};

    switch (size) {
      case "small":
        return {
          title: "text-xl font-bold lg:text-2xl",
          subtitle: "mt-2 text-sm",
          body: "mt-2 text-sm font-body",
          childGap: "gap-2",
          childMarginTop: "mt-2",
          titleStyle: { ...gradientStyle }
        };
      case "medium-small":
        return {
          title: "text-2xl font-bold lg:text-3xl",
          subtitle: "mt-3 text-base",
          body: "mt-3 text-base font-body",
          childGap: "gap-3",
          childMarginTop: "mt-2",
          titleStyle: { ...gradientStyle }
        };
      case "large":
        return {
          title: "text-4xl font-bold lg:text-6xl",
          subtitle: "mt-6 text-3xl",
          body: "mt-6 text-xl font-body",
          childGap: "gap-6",
          childMarginTop: "mt-2",
          titleStyle: {
            fontSize: "clamp(3rem, 8vw, 6rem)",
            ...gradientStyle
          }
        };
      default: // medium
        return {
          title: "text-3xl font-bold lg:text-5xl",
          subtitle: "mt-4 text-lg",
          body: "mt-4 text-lg font-body",
          childGap: "gap-4",
          childMarginTop: "mt-4",
          titleStyle: { ...gradientStyle }
        };
    }
  };

  const textSizes = getTextSizes(textSize);

  // Get Builder.io selection attributes - always provide consistent attributes for hydration
  const builderAttributes = {
    "builder-id": builderBlock?.id || "",
    "builder-model": builderBlock?.model || "",
    "data-builder-component": "TextBlock"
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      const extraProps = { siteData };

      // If it's a Stats component, add the isChildComponent prop
      if (child.type?.name === "Stats" || child.props?.component === "Stats") {
        extraProps.isChildComponent = true;
      }

      return React.cloneElement(child, extraProps);
    }
    return child;
  });

  // Wrap children to center Popup components
  const wrappedChildren = React.Children.map(childrenWithProps, (child) => {
    if (
      React.isValidElement(child)
      // (child.type?.name === "Popup" || child.props?.component === "Popup")
    ) {
      return (
        <div
          key={child.key}
          className={`text-center ${textSizes.childMarginTop}`}
        >
          {child}
        </div>
      );
    }
    return child;
  });

  return (
    <div
      className={`${noPadding ? "" : "py-8 lg:py-22 min-h-[400px]"} flex flex-col ${noPadding ? "" : "h-full"}`}
      {...builderAttributes}
      {...anchorTags(anchor)}
      // style={{ backgroundColor: colors?.primary }}
    >
      <div
        className={`${noPadding ? "" : "container flex-1"} flex flex-col ${verticalClasses}`}
      >
        <div
          className={`${alignment === "center" ? "text-center" : alignment === "right" ? "text-right" : "text-left"}`}
        >
          {title && (
            <h2
              className={`${textSizes.title} leading-none ${url ? 'cursor-pointer hover:opacity-80 transition-opacity duration-200' : ''}`}
              style={{
                color: useGradientText ? "transparent" : textColor,
                ...textSizes.titleStyle
              }}
              onClick={url ? handleTitleClick : undefined}
            >
              {title}
            </h2>
          )}
          {subtitle && (
            <h3
              className={textSizes.subtitle}
              style={{
                color: subtitleBodyColor
              }}
            >
              {subtitle}
            </h3>
          )}
          {body && (
            <ClientHtmlContent
              html={body}
              className={`rich-text-content ${textSizes.body} ${alignment === "center" ? "max-w-[800px] mx-auto" : "max-w-[800px]"}`}
              style={{
                color: subtitleBodyColor
              }}
            />
          )}
          <div
            className={`flex flex-col ${alignment === "center" ? "justify-center items-center" : alignment === "right" ? "items-end" : "items-start"} ${textSizes.childGap} ${textSizes.childMarginTop}`}
          >
            {wrappedChildren}
          </div>
        </div>
      </div>
    </div>
  );
}
