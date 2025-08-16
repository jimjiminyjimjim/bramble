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
  anchor,
  image,
  imageScale,
  iconColor,
  theme,
  children
}) => {
  const colors = useTheme(theme);

  const renderCenterLayout = () => (
    <div className="text-center">
      {image && (
        <div className="mb-8 lg:mb-12 -mx-4 sm:-mx-8 flex justify-center overflow-hidden" style={{ height: '400px' }}>
          <img
            alt="Mobile 3"
            className="w-full h-full object-cover"
            src={image || mobile3Img.src}
            style={{
              transform: imageScale !== undefined ? `scale(${1 + (imageScale / 50)})` : 'scale(1)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      )}
      <div className="mb-8 lg:mb-16">
        <h2
          className="text-4xl font-semibold"
          style={{ color: colors.dark }}
        >
          {heading}
        </h2>
        <h4 className="mt-4 text-lg max-w-[600px] mx-auto">
          {description}
        </h4>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 xl:gap-12">
        {features?.map((feature, index) => (
          <div
            className="flex flex-col items-center text-center"
            key={index}
          >
            <div className="mb-4 inline-flex items-center justify-center rounded font-medium text-primary">
              {feature.image ? (
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="max-w-[80px]"
                />
              ) : (
                <DynamicIcon
                  iconName={feature.icon}
                  size={40}
                  style={{ color: iconColor || colors?.primaryColour }}
                />
              )}
            </div>
            {feature?.title && (
              <h4 className="text-lg font-bold mb-2">
                {feature?.title}
              </h4>
            )}
            {feature?.description && (
              <p className="text-base">
                {feature?.description}
              </p>
            )}
          </div>
        ))}
      </div>
      {children && <div className="mt-8">{children}</div>}
    </div>
  );

  const renderLeftLayout = () => (
    <div className="grid gap-16 lg:grid-cols-2 xl:gap-24 min-h-[600px]">
      {image && (
        <div className="relative flex justify-center items-center overflow-hidden rounded-lg h-full">
          <img
            alt="Mobile 3"
            className="w-full h-full object-cover"
            src={image || mobile3Img.src}
            style={{
              transform: imageScale !== undefined ? `scale(${1 + (imageScale / 50)})` : 'scale(1)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      )}
      <div className="flex flex-col justify-center">
        <div className="mb-8 lg:mb-12">
          <h2
            className="text-4xl font-semibold leading-tight"
            style={{ color: colors.dark }}
          >
            {heading}
          </h2>
          <h4 className="mt-4 text-lg">
            {description}
          </h4>
        </div>
        <div className="space-y-6">
          {features?.map((feature, index) => (
            <div className="flex gap-4" key={index}>
              <div className="flex-shrink-0 inline-flex rounded font-medium text-primary mt-1">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-w-[60px]"
                  />
                ) : (
                  <DynamicIcon
                    iconName={feature.icon}
                    size={25}
                    style={{ color: iconColor || colors?.primaryColour }}
                  />
                )}
              </div>
              <div>
                {feature?.title && (
                  <h4 className="text-lg font-bold mb-1 leading-tight">
                    {feature?.title}
                  </h4>
                )}
                {feature?.description && (
                  <p className="text-base">
                    {feature?.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );

  const renderRightLayout = () => (
    <div className="grid gap-16 lg:grid-cols-2 xl:gap-24 min-h-[600px]">
      <div className="flex flex-col justify-center">
        <div className="mb-8 lg:mb-12">
          <h2
            className="text-4xl font-semibold leading-tight"
            style={{ color: colors.dark }}
          >
            {heading}
          </h2>
          <h4 className="mt-4 text-lg">
            {description}
          </h4>
        </div>
        <div className="space-y-6">
          {features?.map((feature, index) => (
            <div className="flex gap-4" key={index}>
              <div className="flex-shrink-0 inline-flex rounded font-medium text-primary mt-1">
                {feature.image ? (
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="max-w-[60px]"
                  />
                ) : (
                  <DynamicIcon
                    iconName={feature.icon}
                    size={25}
                    style={{ color: iconColor || colors?.primaryColour }}
                  />
                )}
              </div>
              <div>
                {feature?.title && (
                  <h4 className="text-lg font-bold mb-1 leading-tight">
                    {feature?.title}
                  </h4>
                )}
                {feature?.description && (
                  <p className="text-base">
                    {feature?.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        {children && <div className="mt-8">{children}</div>}
      </div>
      {image && (
        <div className="relative -mx-4 sm:-mx-8 lg:mx-0 flex justify-center items-center overflow-hidden h-full">
          <img
            alt="Mobile 3"
            className="w-full h-full object-cover"
            src={image || mobile3Img.src}
            style={{
              transform: imageScale !== undefined ? `scale(${1 + (imageScale / 50)})` : 'scale(1)',
              transformOrigin: 'center center'
            }}
          />
        </div>
      )}
    </div>
  );

return (
    <section
      className="py-8 lg:py-28"
      {...anchorTags(anchor)}
      style={{ backgroundColor: colors.primary }}
    >
      <div className="container">
        {align === "center" && renderCenterLayout()}
        {align === "left" && renderLeftLayout()}
        {align === "right" && renderRightLayout()}
        {!align && renderCenterLayout()}
      </div>
    </section>
  );
};