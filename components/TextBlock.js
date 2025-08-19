'use client'
import { anchorTags } from "@/helpers/anchorTags";
import React from "react";
import { useTheme } from "@/helpers/theme";
import { Blocks, BuilderBlock } from "@builder.io/sdk-react";

export function TextBlock({
  children,
  title,
  subtitle,
  body,
  anchor,
  siteData,
  theme,
  coloumnTest,
  builderBlock,
  image,
  alignment = "left",
  verticalAlignment = "middle",
  textSize = "medium",
  useGradientText = false,
  gradientColor1 = "#3B82F6",
  gradientColor2 = "#8B5CF6",
  textColor,
  noPadding = true
}) {
  const colors = useTheme(theme);
  
  // Determine the text color to use (custom color overrides theme)
  const finalTextColor = textColor || colors.dark;

  // Define vertical alignment classes
  const getVerticalAlignmentClasses = (vAlign) => {
    switch (vAlign) {
      case "top":
        return "justify-start items-start";
      case "bottom":
        return "justify-end items-end";
      default: // middle
        return "justify-center items-center";
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
          body: "mt-2 text-xs font-body",
          childGap: "gap-2",
          childMarginTop: "mt-2",
          titleStyle: { ...gradientStyle }
        };
      case "large":
        return {
          title: "text-4xl font-bold lg:text-6xl",
          subtitle: "mt-6 text-3xl",
          body: "mt-6 text-2xl font-body",
          childGap: "gap-6",
          childMarginTop: "mt-6",
          titleStyle: {
            fontSize: "clamp(3rem, 8vw, 6rem)",
            ...gradientStyle
          }
        };
      default: // medium
        return {
          title: "text-3xl font-bold lg:text-5xl",
          subtitle: "mt-4 text-lg",
          body: "mt-4 text-base font-body",
          childGap: "gap-4",
          childMarginTop: "mt-4",
          titleStyle: { ...gradientStyle }
        };
    }
  };

  const textSizes = getTextSizes(textSize);

  // Get Builder.io selection attributes
  const builderAttributes = builderBlock ? {
    'builder-id': builderBlock.id,
    'builder-model': builderBlock.model,
    'data-builder-component': 'TextBlock'
  } : {};

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
      React.isValidElement(child) &&
      (child.type?.name === "Popup" || child.props?.component === "Popup")
    ) {
      return (
        <div key={child.key} className={`text-center ${textSizes.childMarginTop}`}>
          {child}
        </div>
      );
    }
    return child;
  });

  const isTwoColumn = image && (alignment === "left" || alignment === "right");
  const isCentered = image && alignment === "center";

  const imageElement = (
    <div className={`${isCentered ? 'w-full flex justify-center mb-8' : 'w-full lg:w-1/3 flex items-center justify-center'}`}>
      <img
        src={image}
        alt={title || "TextBlock image"}
        className={`${isCentered ? 'max-w-md' : 'w-full'} h-auto object-cover`}
      />
    </div>
  );

  const textElement = (
    <div className={`${isTwoColumn ? 'w-full lg:w-2/3 px-4 flex items-center' : 'w-full'}`}>
      <div className={`${isCentered ? 'text-center max-w-[800px] mx-auto' : ''}`}>
        <h2
          className={`${textSizes.title} leading-tight ${isCentered ? 'text-center' : 'text-left'}`}
          style={{
            color: useGradientText ? "transparent" : finalTextColor,
            ...textSizes.titleStyle
          }}
        >
          {title}
        </h2>
        <p 
          className={`${textSizes.subtitle} ${isCentered ? 'text-center' : 'text-left'}`}
          style={{ color: colors.dark }}
        >
          {subtitle}
        </p>
        <div
          className={`rich-text-content ${textSizes.body} ${isCentered ? 'text-center' : 'text-left'}`}
          style={{ color: colors.dark }}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className={`flex flex-col ${textSizes.childGap} ${textSizes.childMarginTop} ${isCentered ? 'items-center' : ''}`}>
          {wrappedChildren}
        </div>
      </div>
    </div>
  );

  return (
    <section
      className={`${noPadding ? '' : 'py-8 lg:py-22 min-h-[400px]'} flex flex-col ${noPadding ? '' : 'h-full'}`}
      {...builderAttributes}
      {...anchorTags(anchor)}
      // style={{ backgroundColor: colors?.primary }}
    >
      <div className={`${noPadding ? '' : 'container flex-1'} flex flex-col ${verticalClasses}`}>
        {isCentered ? (
          <div className="flex flex-col items-center">
            {imageElement}
            {textElement}
          </div>
        ) : isTwoColumn ? (
          <div className="flex flex-col lg:flex-row gap-[40px]">
            {alignment === "left" ? (
              <>
                {imageElement}
                {textElement}
              </>
            ) : (
              <>
                {textElement}
                {imageElement}
              </>
            )}
          </div>
        ) : (
          <div className={`${alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left'}`}>
            {title && (
              <h2
                className={`${textSizes.title} leading-tight`}
                style={{
                  color: useGradientText ? "transparent" : finalTextColor,
                  ...textSizes.titleStyle
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p 
                className={textSizes.subtitle}
                style={{ color: colors.dark }}
              >
                {subtitle}
              </p>
            )}
            {body && (
              <div
                className={`rich-text-content ${textSizes.body} ${alignment === 'center' ? 'max-w-[800px] mx-auto' : 'max-w-[800px]'}`}
                style={{ color: colors.dark }}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
            <div className={`flex flex-col ${alignment === 'center' ? 'justify-center items-center' : alignment === 'right' ? 'items-end' : 'items-start'} ${textSizes.childGap} ${textSizes.childMarginTop}`}>
              {wrappedChildren}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
