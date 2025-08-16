"use client";

import { DynamicIcon } from "@/components/Icon";
import { anchorTags } from "@/helpers/anchorTags";
import { useTheme } from "@/helpers/theme";

export const FeaturesList = ({
  features,
  align,
  anchor,
  iconColor,
  theme,
  children
}) => {

  const renderCenterLayout = () => (
    <div className="text-center">
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
                  style={{ color: iconColor }}
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
    <div className="flex flex-col justify-center">
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
                  style={{ color: iconColor  }}
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
  );

  const renderRightLayout = () => (
    <div className="flex flex-col justify-center">
      <div className="space-y-6">
        {features?.map((feature, index) => (
          <div className="flex gap-4 flex-row-reverse text-right" key={index}>
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
                  style={{ color: iconColor  }}
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
  );

  return (
    <section
      {...anchorTags(anchor)}
      // style={{ backgroundColor: colors.primary }}
    >
      <div>
        {align === "center" && renderCenterLayout()}
        {align === "left" && renderLeftLayout()}
        {align === "right" && renderRightLayout()}
        {!align && renderCenterLayout()}
      </div>
    </section>
  );
};