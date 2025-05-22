import avatar1Img from "@/assets/images/avatar/1.png";
import avatar2Img from "@/assets/images/avatar/2.png";
import avatar3Img from "@/assets/images/avatar/3.png";
import worldMapImg from "@/assets/images/landing/world-map.png";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTheme } from "@/helpers/theme";
import { anchorTags } from "@/helpers/anchorTags";

import "swiper/css";

export const Testimonial = ({ title, testimonials, theme, anchor }) => {
  const colors = useTheme(theme);

  return (
    <section
      className="py-8 relative"
      {...anchorTags(anchor)}
      style={{ backgroundColor: colors.primary }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-50"
        style={{ backgroundImage: `url(${worldMapImg})` }}
      ></div>
      <div className="relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-semibold">{title}</h2>
        </div>
        <Swiper
          className="mt-16"
          spaceBetween={50}
          loop
          autoplay={{
            delay: 5000
          }}
          navigation={{
            prevEl: ".testimonials-button-prev",
            nextEl: ".testimonials-button-next"
          }}
          modules={[Navigation, Autoplay, Thumbs]}
          slidesPerView={1}
        >
          {testimonials.map(
            ({ quote, name, qualification, rating, icon, image }, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="text-center">
                    {image && (
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 bg-base-content/10">
                          <img src={image} />
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex items-center justify-center gap-1">
                      {Array.from({ length: rating }, (_, i) => (
                        <StarIcon
                          key={i}
                          className="fill-orange-400 text-orange-400"
                          size={20}
                        />
                      ))}
                    </div>
                    <p className="mt-4 inline-block max-w-[600px] text-center text-lg">
                      {quote}
                    </p>
                    <p className="mt-8 text-lg font-medium">{name}</p>
                    <p className="text-sm text-base-content/70">
                      {qualification}
                    </p>
                  </div>
                </SwiperSlide>
              );
            }
          )}
        </Swiper>
        {testimonials?.length > 1 && (
          <div className="relative mt-8 flex items-center justify-center gap-6">
            <div className="testimonials-button-prev cursor-pointer">
              <div className="border-default-300 bg-default-50/90 hover:bg-default-50 flex h-10 w-10 items-center justify-center rounded-lg border transition-all hover:bg-base-content/5">
                <ChevronLeftIcon size={20} />
              </div>
            </div>
            <div className="testimonials-button-next cursor-pointer">
              <div className="border-default-300 bg-default-50/90 hover:bg-default-50 flex h-10 w-10 items-center justify-center rounded-lg border transition-all hover:bg-base-content/5">
                <ChevronRightIcon size={20} />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
