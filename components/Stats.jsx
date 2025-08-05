"use client";

import { DynamicIcon } from "@/components/Icon";
import { useTheme } from "@/helpers/theme";
import { cx } from "classix";

export const Stats = ({ title, theme, subtitle, stats = [], alignment = "center", children, isChildComponent = false, margin = "medium", size = "medium" }) => {
  const colors = useTheme(theme);

  // Define text size classes based on the size prop
  const getTextSizes = (sizeType) => {
    switch (sizeType) {
      case "small":
        return {
          mainTitle: isChildComponent ? "text-sm lg:text-lg" : "text-base lg:text-3xl",
          mainSubtitle: isChildComponent ? "text-xs lg:text-sm" : "text-xs lg:text-sm",
          statTitle: "text-sm lg:text-xl",
          statDescription: "text-xs lg:text-sm"
        };
      case "large":
        return {
          mainTitle: isChildComponent ? "text-lg lg:text-3xl" : "text-xl lg:text-6xl",
          mainSubtitle: isChildComponent ? "text-xs lg:text-lg" : "text-xs lg:text-lg",
          statTitle: "text-lg lg:text-3xl",
          statDescription: "text-xs lg:text-lg"
        };
      default: // medium
        return {
          mainTitle: isChildComponent ? "text-base lg:text-2xl" : "text-lg lg:text-5xl",
          mainSubtitle: isChildComponent ? "text-xs lg:text-base" : "text-xs lg:text-base",
          statTitle: "text-base lg:text-2xl",
          statDescription: "text-xs lg:text-base"
        };
    }
  };

  const textSizes = getTextSizes(size);

  // Define margin/padding classes based on the margin prop
  const getMarginClasses = (marginSize) => {
    if (isChildComponent) {
      // For child components, use smaller spacing
      switch (marginSize) {
        case "none":
          return "py-0 pb-1";
        case "small":
          return "py-2";
        case "large":
          return "py-8";
        default: // medium
          return "py-4";
      }
    } else {
      // For standalone components, use larger spacing
      switch (marginSize) {
        case "none":
          return "py-0 pb-5";
        case "small":
          return "pt-5 pb-10";
        case "large":
          return "pt-20 pb-40";
        default: // medium
          return "pt-10 pb-20";
      }
    }
  };

  /* ────────────────────────────── render ─────────────────────────────────── */
  // choose grid columns dynamically so 2–3 items stay centred
  const mdCols =
    stats.length === 1
      ? "md:grid-cols-1"
      : stats.length === 2
      ? "md:grid-cols-2"
      : stats.length === 3
      ? "md:grid-cols-3"
      : "md:grid-cols-4";

  return (
    <section style={{ backgroundColor: colors.primary }} className="w-full">
      <div className={cx("container", getMarginClasses(margin))}>
        {/* heading block */}
        <div className="text-center">
          <h2
            className={cx(
              "font-semibold",
              textSizes.mainTitle
            )}
            style={{ color: colors.text.title }}
          >
            {title}
          </h2>
          <p
            className={cx(
              isChildComponent ? "mt-2" : "mt-4",
              textSizes.mainSubtitle
            )}
            style={{ color: colors.text.body }}
          >
            {subtitle}
          </p>
        </div>

        {/* stats grid */}
        <div
          className={cx(
            isChildComponent ? "mt-4" : "mt-8",
            "grid gap-8 md:gap-20",
            mdCols,
            "auto-rows-fr"
          )}
        >
          {stats.map((stat, index) => {
            const statAlignment = stat.alignment || "center";
            const isCenter = statAlignment === "center";
            
            return (
              <div key={index} className={cx(
                "grid w-full h-full",
                isCenter 
                  ? "grid-rows-[auto_auto_1fr] justify-items-center text-center gap-3" 
                  : "grid-cols-[74px_1fr] grid-rows-[auto_1fr] gap-x-3 gap-y-1 items-start"
              )}>
                {/* image / icon */}
                <div className={cx(
                  "rounded transition-all flex-shrink-0 flex justify-center items-center",
                  isCenter ? "w-auto h-[74px] row-start-1" : "w-[74px] h-[74px] row-span-2 col-start-1"
                )}>
                  {stat.image ? (
                    <img
                      src={stat.image}
                      alt=""
                      className="max-h-[50px] max-w-[50px]"
                    />
                  ) : (
                    <DynamicIcon
                      iconName={stat.icon || "AiFillCloseCircle"}
                      className="size-8"
                      size={32}
                      style={{ color: stat.iconColor || "#3B82F6" }}
                    />
                  )}
                </div>

                {/* title */}
                <h3
                  className={cx(
                    "font-semibold break-words hyphens-auto",
                    textSizes.statTitle,
                    isCenter ? "text-center leading-snug row-start-2" : "text-left leading-tight col-start-2 row-start-1"
                  )}
                  style={{
                    color: colors.text.title,
                    lineHeight: isCenter ? "1.3" : "1.25"
                  }}
                >
                  {stat.title}
                </h3>

                {/* description */}
                <p
                  className={cx(
                    "leading-relaxed",
                    textSizes.statDescription,
                    isCenter ? "text-center row-start-3" : "text-left col-start-2 row-start-2"
                  )}
                  style={{ color: colors.text.body }}
                >
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {children}
      </div>
    </section>
  );
};
