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
  align = "left",
  textSize = "medium",
  useGradientText = false,
  gradientColor1 = "#3B82F6",
  gradientColor2 = "#8B5CF6"
}) {
  const colors = useTheme(theme);

  // Define text size classes based on the textSize prop
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
          title: "text-lg font-bold lg:text-2xl",
          subtitle: "mt-2 text-sm",
          body: "mt-1 text-xs font-body mb-2",
          titleStyle: { ...gradientStyle }
        };
      case "large":
        return {
          title: "text-4xl font-bold lg:text-6xl",
          subtitle: "mt-6 text-3xl",
          body: "mt-3 text-2xl font-body mb-6",
          titleStyle: {
            fontSize: "clamp(3rem, 8vw, 6rem)",
            ...gradientStyle
          }
        };
      default: // medium
        return {
          title: "text-2xl font-bold lg:text-5xl",
          subtitle: "mt-4 text-lg",
          body: "mt-1 text-base font-body mb-4",
          titleStyle: { ...gradientStyle }
        };
    }
  };

  const textSizes = getTextSizes(textSize);

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
        <div key={child.key} className="text-center mt-4">
          {child}
        </div>
      );
    }
    return child;
  });

  const isTwoColumn = image && (align === "left" || align === "right");

  const imageElement = (
    <div className="w-full lg:w-1/3 flex items-center justify-center">
      <img
        src={image}
        alt={title || "TextBlock image"}
        className="w-full h-auto object-cover"
      />
    </div>
  );

  const textElement = (
    <div className={`w-full lg:w-2/3 px-4 flex items-center`}>
      <div>
        <h2
          className={`${textSizes.title} leading-tight`}
          style={{
            color: useGradientText ? "transparent" : colors.dark,
            textAlign: "left",
            ...textSizes.titleStyle
          }}
        >
          {title}
        </h2>
        <p className={`${textSizes.subtitle} text-left`}>{subtitle}</p>
        <div
          className={`${textSizes.body} max-w-[800px]`}
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        <div className="flex flex-col gap-4 mt-4">
          {wrappedChildren}
        </div>
      </div>
    </div>
  );

  return (
    <section
      className="py-8 lg:py-22"
      {...anchorTags(anchor)}
      style={{ backgroundColor: colors?.primary }}
    >
      <div className="container">
        {isTwoColumn ? (
          <div className="flex flex-col lg:flex-row gap-[40px]">
            {align === "left" ? (
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
          <div className="text-center">
            {title && (
              <h2
                className={`${textSizes.title} leading-tight`}
                style={{
                  color: useGradientText ? "transparent" : colors.dark,
                  ...textSizes.titleStyle
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && <p className={textSizes.subtitle}>{subtitle}</p>}
            {body && (
              <div
                className={`${textSizes.body} max-w-[800px] mx-auto`}
                dangerouslySetInnerHTML={{ __html: body }}
              />
            )}
            <div className="flex flex-col justify-center gap-4 mt-4">
              {wrappedChildren}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
