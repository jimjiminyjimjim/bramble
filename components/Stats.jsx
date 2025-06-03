"use client";

import { useEffect, useRef } from "react";
import fitty from "fitty";

import { DynamicIcon } from "@/components/Icon";
import { useTheme } from "@/helpers/theme";
import { cx } from "classix";

export const Stats = ({ title, theme, subtitle, stats = [], children }) => {
  const colors = useTheme(theme);

  console.log("Stats colors", colors);
  /* ───────────────────────── refs for every <h3> ─────────────────────────── */
  const heads = useRef([]);
  heads.current = []; // reset on each render so indices stay in sync

  /* ───────────────────── fit headings & equalise size ────────────────────── */
  useEffect(() => {
    if (!heads.current.length) return;

    // 1) run fitty on each heading
    const instances = heads.current.map((el) =>
      fitty(el, {
        minSize: 24,           // keep things readable
        maxSize: 48,           // matches your “text-4xl” default
        multiLine: true,
        observeMutations: false,
      })
    );

    // 2) after fitty settles, find the smallest size
    const equalise = () => {
      const sizes = heads.current.map((el) =>
        parseFloat(getComputedStyle(el).fontSize)
      );
      const smallest = Math.min(...sizes);

      // 3) force that size onto every heading
      heads.current.forEach((el) => (el.style.fontSize = `${smallest}px`));
    };

    // first run (next frame so fitty has updated)
    requestAnimationFrame(equalise);

    // keep them in sync whenever fitty re-fires (e.g. on resize)
    heads.current.forEach((el) =>
      el.addEventListener("fit", equalise, { passive: true })
    );

    // cleanup
    return () => {
      instances.forEach((ins) => ins.unsubscribe());
      heads.current.forEach((el) =>
        el.removeEventListener("fit", equalise)
      );
    };
  }, [stats]);

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
      <div className={cx("container pt-10 pb-20")}>
        {/* heading block */}
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

        {/* stats grid */}
        <div
          className={cx(
            "mt-8 grid grid-cols-2 gap-20 text-center",
            mdCols,
            "justify-center"
          )}
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              {/* image / icon */}
              <div className="rounded p-3 transition-all">
                {stat.image ? (
                  <img
                    src={stat.image}
                    alt=""
                    className="max-h-[150px] mx-auto"
                  />
                ) : (
                  <DynamicIcon
                    iconName="AiFillCloseCircle"
                    className="size-8 text-primary"
                    size={32}
                  />
                )}
              </div>

              {/* title that auto-fits, then equalises */}
              <h3
                ref={(el) => el && (heads.current[index] = el)}
                className="mt-3 font-semibold leading-tight"
                style={{
                  color: colors.text.title,
                  maxHeight: "2.3em", // ≈ two lines for lh ~1.15
                }}
              >
                {stat.title}
              </h3>

              {/* description */}
              <p
                className="mt-1 text-base"
                style={{ color: colors.text.body }}
              >
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
};
