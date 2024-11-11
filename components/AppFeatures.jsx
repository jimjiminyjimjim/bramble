"use client";

import mobile3Img from "@/assets/images/landing/mobile-3.png";
import { Card } from "react-daisyui";
import { DynamicIcon } from "@/components/Icon";
import { anchorTags } from "@/helpers/anchorTags";
import { useTheme } from "@/helpers/theme";

export const AppFeatures = ({
  heading,
  description,
  features,
  integrations,
  hideImage,
  anchor,
  image,
  theme,
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
          <h2 className="text-4xl font-semibold">{heading}</h2>
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
          {features?.length < 5 ? (
            <>
              <div
                className={`flex flex-col justify-between ${hideImage ? "items-center text-center" : ""}`}
              >
                <div className="space-y-8">
                  {features?.map((feature, index) => (
                    <div className="flex items-start gap-5" key={index}>
                      <div className="inline-flex items-center justify-center rounded font-medium text-primary">
                        {feature.image ? (
                          <img src={feature.image} alt={feature.title} />
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
                        <h4 className="text-2xl font-bold">{feature.title}</h4>
                        <p className="mt-1 text-base">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {!hideImage && (
                <div className="relative flex justify-center items-center">
                  <img
                    alt="Mobile 3"
                    className="h-[500px]"
                    src={image || mobile3Img.src}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col justify-between">
                <div className="space-y-8">
                  {leftFeatures?.map((feature, index) => (
                    <div className="flex items-start gap-5" key={index}>
                      <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                        <DynamicIcon iconName={feature.icon} />
                      </div>
                      <div>
                        <p className="text-base font-medium">{feature.title}</p>
                        <p className="mt-1 text-base-content/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="space-y-8">
                  {rightFeatures?.map((feature, index) => (
                    <div className="flex items-start gap-5" key={index}>
                      <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                        <DynamicIcon iconName={feature.icon} />
                      </div>
                      <div>
                        <p className="text-base font-medium">{feature.title}</p>
                        <p className="mt-1 text-base-content/80">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
