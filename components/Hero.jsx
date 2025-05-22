"use client";

import mobile1Img from "@/assets/images/landing/mobile-1.png";
import appstoreImg from "@/assets/images/logo/appstore.png";
import playstoreImg from "@/assets/images/logo/playstore.png";
import { useTheme } from "@/helpers/theme";
import cx from "classix";

export const Hero = ({
  title,
  subtitle,
  description,
  downloads,
  image,
  backgroundImage,   // <— new
  theme,
  children,
  bounce,
  fullScreen
}) => {
  const colors = useTheme(theme);

  return (
    <section
      className={cx(
        "relative overflow-hidden py-8 lg:py-24 flex flex-1",
        fullScreen ? "min-h-screen" : "h-auto"
      )}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Optional color/gradient overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: colors?.primary, opacity: 0.6 }}
      />

      {/* Foreground content */}
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-12">
          {/* Text column */}
          <div className="order-1">
            <h1
              className={cx(
                "text-center font-bold leading-none lg:text-left",
                "text-5xl"
              )}
              style={{ color: colors.dark }}
            >
              {title}
            </h1>

            <h5
              style={{ color: colors.dark }}
              className="mt-8 text-center font-bold text-xl sm:text-start lg:text-2xl mb-2"
            >
              {subtitle}
            </h5>

            <p
              style={{ color: colors.dark }}
              className="text-base font-body mb-3"
            >
              {description}
            </p>

            <div className="text-center lg:text-left my-[20px]">{children}</div>

            {downloads === "Show App Store" && (
              <div className="mt-16 flex justify-center gap-4 sm:justify-start">
                <a href="#">
                  <img src={appstoreImg.src} alt="App Store" />
                </a>
                <a href="#">
                  <img src={playstoreImg.src} alt="Play Store" />
                </a>
              </div>
            )}
          </div>

          {/* Image column */}
          <div className="relative order-2 flex justify-center">
            <img
              src={image || mobile1Img.src}
              alt="Hero"
              className={cx(bounce && "bounce-animation", "h-[550px]")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
