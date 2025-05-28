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
}) {
  const colors = useTheme(theme);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { siteData });
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
          className="text-2xl font-bold lg:text-5xl leading-[1]"
          style={{ color: colors.dark, textAlign: "left" }}
        >
          {title}
        </h2>
        <p className="mt-4 text-lg text-left">{subtitle}</p>
        <div
          className="mt-1 text-base font-body mb-4 max-w-[800px]"
          style={{ textAlign: "left" }}
          dangerouslySetInnerHTML={{ __html: body }}
        />
        {childrenWithProps}
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
            <h2
              className="text-2xl font-bold lg:text-5xl leading-[1]"
              style={{ color: colors.dark }}
            >
              {title}
            </h2>
            <p className="mt-4 text-lg">{subtitle}</p>
            <div
              className="mt-1 text-base font-body mb-4 max-w-[800px] mx-auto"
              dangerouslySetInnerHTML={{ __html: body }}
            />
            {childrenWithProps}
          </div>
        )}
      </div>
    </section>
  );
}
