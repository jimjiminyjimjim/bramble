"use client";
// import bgGradientImg from "@/assets/images/landing/bg-gradient.png";
import mobile1Img from "@/assets/images/landing/mobile-1.png";
import appstoreImg from "@/assets/images/logo/appstore.png";
import playstoreImg from "@/assets/images/logo/playstore.png";
import { useTheme } from "@/helpers/theme";

export const Hero = ({ title, subtitle, description, downloads, image, theme, children }) => {
  const colors = useTheme(theme);

  return (
    <section className="relative py-8 lg:py-24">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundColor: colors?.primary }}
      ></div>
      <div className="container relative z-10">
        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 xl:gap-36">
          <div className="order-2 lg:order-1">
            <h1 className="text-center text-3xl/tight font-bold leading-10 tracking-tight sm:text-start lg:text-4xl/tight" style={{color: colors.dark}}>
              {title}
            </h1>
            <h5 className="mt-8 text-center font-bold text-xl sm:text-start lg:text-xl mb-2">
              {subtitle}
            </h5>
            <p className="text-base font-body mb-3">{description}</p>
            {children}
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

          <div className="relative order-1 lg:order-2">
            <div className="flex justify-center">
              {image ? (
                <img src={image} className="bounce-animation h-[550px]" />
              ) : (
                <img
                  alt="Mobile-1"
                  className="bounce-animation h-[550px]"
                  src={mobile1Img.src}
                />
              )}
            </div>
            {/* <div className="absolute left-0 top-[20%]">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="flex flex-row items-center justify-center gap-3 p-3">
                  <div className="flex items-center justify-center rounded-full bg-primary p-2">
                    <ZapIcon
                      className="size-5 text-primary-content"
                      size={20}
                    />
                  </div>
                  <div>
                    <p className="text-lg/none font-semibold">Boosted</p>
                    <p>Your Productivity</p>
                  </div>
                </Card.Body>
              </Card>
            </div> */}
            {/* <div className="absolute bottom-[20%] end-0">
              <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                <Card.Body className="w-64 gap-0 p-3">
                  <div className="flex gap-3">
                    <div className="mask mask-squircle w-8 bg-base-content/10">
                      <img src={avatar1Img.src} />
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                      <StarIcon
                        className="size-4 fill-orange-400 text-orange-400"
                        size={16}
                      />
                    </div>
                  </div>
                  <p className="mt-2 text-[13px] font-medium">
                    WrapAI is a game-changer! The virtual assistant boosted my
                    productivity.
                  </p>
                </Card.Body>
              </Card>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
