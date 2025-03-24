"use client";

import { anchorTags } from "@/helpers/anchorTags";
import { useTheme } from "@/helpers/theme";
import { cx } from "classix";

export const Screenshots = ({
  title,
  subtitle,
  description,
  anchor,
  alignment,
  screens,
  theme
}) => {
  const colors = useTheme(theme);

  return (
    <section
      style={{ backgroundColor: colors.primary }}
      className={`py-8 lg:py-24 ${alignment === "center" ? "text-center" : alignment === "right" ? "text-right" : "text-left"}`}
      {...anchorTags(anchor)}
    >
      <div className="container">
        <div className="lg:col-span-2">
          <p className="text-xl font-semibold lg:text-3xl">{title}</p>
          <p className="mt-2 text-2xl">{subtitle}</p>
          <p className="mt-4 text-base">{description}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-4 items-start">
          {screens?.map((screen, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex-grow flex justify-center">
                <img
                  src={screen.image}
                  alt={screen.title}
                  className="object-contain w-full max-h-[200px]"
                />
              </div>
              <div className="p-4">
                <h3 className="text-2xl font-semibold">{screen.title}</h3>
                <p className="mt-2 text-base">{screen.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
