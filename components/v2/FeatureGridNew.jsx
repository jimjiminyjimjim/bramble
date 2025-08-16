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
  children
}) => {
  const colors = useTheme(theme);

  const splitIndex = Math.ceil(features?.length / 2);
  

  return (
    <section
      {...anchorTags(anchor)}
    >
      <div>
        <div className="grid gap-16 lg:grid-cols-2 xl:gap-24">
          {features?.map((feature, index) => (
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
                {feature.icon && (
                  <div className="flex-shrink-0 mt-1">
                    <DynamicIcon
                      iconName={feature.icon}
                      color={colors?.primaryColour}
                      size={24}
                    />
                  </div>
                )}
                <div>
                  <h3 className="text-2xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-base">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
