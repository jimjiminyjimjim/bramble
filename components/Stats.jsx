"use client";

import { DynamicIcon } from "@/components/Icon";
import { Context } from "@/components/Layout";
import { useTheme } from "@/helpers/theme";
import { cx } from "classix";

export const Stats = ({ title, theme, subtitle, stats, children }) => {
  const colors = useTheme(theme);

  console.log("DARK", colors)

  return (
    <section style={{ backgroundColor: colors.primary }}>
      <div className={cx("container pt-10 pb-20")}>
        <div className="text-center">
          <h2
            className="text-xl font-semibold lg:text-5xl"
            style={{ color: colors.text.title }}
          >
            {title}
          </h2>
          <p
            className="mt-4 text-base lg:text-xl"
            style={{ color: colors.text.body }}
          >
            {subtitle}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-20 text-center md:grid-cols-4">
          {stats?.map((stat, index) => {
            return (
              <div key={index}>
                <div className="inline-block rounded p-3 transition-all">
                  {stat?.image ? (
                    <img src={stat?.image} />
                  ) : (
                    <DynamicIcon
                      iconName="AiFillCloseCircle"
                      className="size-8 text-primary"
                      size={32}
                    />
                  )}
                </div>
                <h3
                  style={{ color: colors.text.title }}
                  className="mt-3 text-4xl font-semibold"
                >
                  {stat?.title}
                </h3>
                <p
                  style={{ color: colors.text.body }}
                  className="mt-1 text-base"
                >
                  {stat?.description}
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
