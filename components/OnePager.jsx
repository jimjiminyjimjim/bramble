"use client";
// import bgGradientImg from "@/assets/images/landing/bg-gradient.png";
import mobile1Img from "@/assets/images/landing/mobile-1.png";
import appstoreImg from "@/assets/images/logo/appstore.png";
import playstoreImg from "@/assets/images/logo/playstore.png";
import { useTheme } from "@/helpers/theme";
import cx from "classix";

export const OnePager = ({
  title,
  subtitle,
  description,
  downloads,
  image,
  theme,
  children,
  bounce
}) => {
  const colors = useTheme(theme);

  console.log("LIGHT HERE", colors);

  return (
    <section className="relative py-8 lg:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundColor: colors?.primary }}
      ></div>
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
          <div className="order-1 lg:order-1">
            <h1
              className="text-center font-bold leading-10 text-4xl lg:text-left"
              style={{ color: colors.dark }}
            >
              {title}
            </h1>
            <h5 className="mt-8 text-center font-bold text-xl sm:text-start lg:text-2xl mb-2">
              {subtitle}
            </h5>
            <p className="text-base font-body mb-3">{description}</p>
            <div className="text-center lg:text-left mt-[20px]">{children}</div>
            {downloads === "Show App Store" ? (
              <div className="mt-16 flex justify-center gap-4 sm:justify-start">
                <a href="#">
                  <img src={appstoreImg.src} alt="App Store" />
                </a>
                <a href="#">
                  <img src={playstoreImg.src} alt="Play Store" />
                </a>
              </div>
            ) : null}
          </div>

          <div className="relative order-2 lg:order-2">
            <div className="flex justify-center">
              {image ? (
                <img
                  src={image}
                  className={cx(
                    bounce ? "bounce-animation" : null,
                    "h-[550px]"
                  )}
                />
              ) : (
                <img
                  alt="Mobile-1"
                  className={cx(
                    bounce ? "bounce-animation" : null,
                    "h-[550px]"
                  )}
                  src={mobile1Img.src}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
