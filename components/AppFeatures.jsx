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
  align,
  integrations,
  hideImage,
  anchor,
  image,
  theme,
  children
}) => {
  console.log("align", align);
  const colors = useTheme(theme);

  const splitIndex = Math.ceil(features?.length / 2);
  const leftFeatures = features?.slice(0, splitIndex);
  const rightFeatures = features?.slice(splitIndex);

  return (
    <section
      className="py-8 lg:py-48"
      {...anchorTags(anchor)}
      style={{ backgroundColor: colors.primary }}
    >
      <div className="container">
        {align === "center" && (
          <div className="text-center mb-8 lg:mb-16">
            <h2
              className="text-4xl font-semibold"
              style={{ color: colors.dark }}
            >
              {heading}
            </h2>
            <h4 className="mt-4 text-lg max-w-[600px] mx-auto text-center">
              {description}
            </h4>
          </div>
        )}
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
                  {align === "left" && (
                    <div className="text-left mb-8 lg:mb-16">
                      <h2
                        className="text-4xl font-semibold leading-tight"
                        style={{ color: colors.dark }}
                      >
                        {heading}
                      </h2>
                      <h4 className="mt-4 text-lg max-w-[600px] mx-auto text-left">
                        {description}
                      </h4>
                    </div>
                  )}
                  {features?.map((feature, index) => (
                    <div className="flex items-center gap-5" key={index}>
                      <div className="inline-flex items-center justify-center rounded font-medium text-primary">
                        {feature.image ? (
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="max-w-[80px]"
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
                      <div className="flex flex-col items-center justify-center ">
                        {feature?.title && (
                          <h4 className="text-2xl font-bold leading-tight">
                            {feature?.title}
                          </h4>
                        )}
                        {feature?.description && (
                          <p className="mt-1 text-base">
                            {feature?.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="ml-10">{children}</div>
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
