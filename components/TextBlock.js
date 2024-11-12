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
  builderBlock
}) {
  const colors = useTheme(theme);

  console.log(title, builderBlock);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { siteData });
    }
    return child;
  });

  return (
    <section
      className="py-8 lg:py-22"
      {...anchorTags(anchor)}
      style={{ backgroundColor: colors?.primary }}
    >
      <div className="container">
        <div className="text-center">
          <h2 className="text-2xl font-bold lg:text-4xl">{title}</h2>
          <p className="mt-4 text-lg">{subtitle}</p>
          <div
            className="mt-1 text-base font-body mb-4 max-w-[800px] mx-auto"
            dangerouslySetInnerHTML={{ __html: body }}
          />
          {childrenWithProps}
        </div>
      </div>
    </section>
  );
}
