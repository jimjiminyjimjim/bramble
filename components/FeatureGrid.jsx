"use client";

import mobile3Img from "@/assets/images/landing/mobile-3.png";
import { Card } from "react-daisyui";
import { DynamicIcon } from "@/components/Icon";
import { anchorTags } from "@/helpers/anchorTags";
import { useTheme } from "@/helpers/theme";

export const FeatureGrid = ({
  heading,
  description,
  features,
  integrations,
  hideImage,
  anchor,
  image,
  theme,
  children
}) => {
  const colors = useTheme(theme);

  const splitIndex = Math.ceil(features?.length / 2);
  const leftFeatures = features?.slice(0, splitIndex);
  const rightFeatures = features?.slice(splitIndex);

  return (
    <section
      className="py-8 lg:py-24"
      {...anchorTags(anchor)}
      style={{ backgroundColor: colors.primary }}
    >
      <div className="container">
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-4xl font-semibold" style={{ color: colors.dark }}>
            {heading}
          </h2>
          <h4 className="mt-4 text-lg max-w-[600px] mx-auto text-center">
            {description}
          </h4>
        </div>
        <div
          className={`${
            features?.length < 5 && hideImage
              ? "flex flex-col justify-center"
              : "grid gap-16 lg:grid-cols-2 xl:gap-24"
          }`}
        >
          {features?.map((feature, index) => (
            <div className="flex items-start gap-5 flex-col" key={index}>
              <div className="w-full aspect-[4/3] overflow-hidden">
        {feature.image ? (
          <img
            src={feature.image}
            alt={feature.title}
            className="w-full h-full object-cover"
          />
        ) : (
          !hideImage && (
            <DynamicIcon
              iconName={feature.icon}
              color={colors?.primaryColour}
              size={25}
            />
          )
        )}
      </div>
              <div>
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="mt-2 text-base">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
