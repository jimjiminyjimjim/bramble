"use client";

import mobile3Img from "@/assets/images/landing/mobile-3.png";
import { Card } from "react-daisyui";
import { DynamicIcon } from "@/components/Icon";
import { anchorTags } from "@/helpers/anchorTags";
import { useTheme } from "@/helpers/theme";

export const FeatureGridNew = ({
  heading,
  description,
  features,
  integrations,
  anchor,
  image,
  theme,
  size = "medium",
  align = "left",
  textColor,
  iconColor,
  maxWidth,
  children
}) => {
  const colors = useTheme(theme);

  // Size mappings for icons
  const iconSizeMap = {
    small: {
      center: 30,
      side: 20
    },
    medium: {
      center: 50,
      side: 30
    },
    large: {
      center: 70,
      side: 45
    }
  };

  const getIconSize = () => {
    return align === "center" ? iconSizeMap[size].center : iconSizeMap[size].side;
  };

  const renderFeature = (feature, index) => {
    const iconElement = feature.icon && (
      <div className="flex-shrink-0 mt-1">
        <DynamicIcon
          iconName={feature.icon}
          color={iconColor || colors?.primaryColour}
          size={getIconSize()}
        />
      </div>
    );

    // Center layout
    if (align === "center") {
      return (
        <div key={index} className="flex flex-col items-center text-center">
          {feature.image && (
            <div className="w-full aspect-[4/3] overflow-hidden mb-4">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          {iconElement}
          <div className="mt-3" style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}>
            <h3 className="text-2xl font-semibold mb-2" style={textColor ? { color: textColor } : {}}>
              {feature.title}
            </h3>
            <p className="text-base" style={textColor ? { color: textColor } : {}}>{feature.description}</p>
          </div>
        </div>
      );
    }

    // Right layout
    if (align === "right") {
      return (
        <div key={index}>
          {feature.image && (
            <div className="w-full aspect-[4/3] overflow-hidden mb-4">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-start gap-3 flex-row-reverse text-right">
            {iconElement}
            <div style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}>
              <h3 className="text-2xl font-semibold mb-2" style={textColor ? { color: textColor } : {}}>
                {feature.title}
              </h3>
              <p className="text-base" style={textColor ? { color: textColor } : {}}>{feature.description}</p>
            </div>
          </div>
        </div>
      );
    }

    // Left layout (default)
    return (
      <div key={index}>
        {feature.image && (
          <div className="w-full aspect-[4/3] overflow-hidden mb-4">
            <img
              src={feature.image}
              alt={feature.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-start gap-3">
          {iconElement}
          <div style={maxWidth ? { maxWidth: `${maxWidth}px` } : {}}>
            <h3 className="text-2xl font-semibold mb-2" style={textColor ? { color: textColor } : {}}>
              {feature.title}
            </h3>
            <p className="text-base" style={textColor ? { color: textColor } : {}}>{feature.description}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      {...anchorTags(anchor)}
    >
      <div>
        <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
          {features?.map((feature, index) => renderFeature(feature, index))}
        </div>
      </div>
    </section>
  );
};
