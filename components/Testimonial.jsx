import worldMapImg from "@/assets/images/landing/world-map.png";
import { ChevronLeftIcon, ChevronRightIcon, StarIcon } from "lucide-react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { anchorTags } from "@/helpers/anchorTags";

import "swiper/css";

export const Testimonial = ({ testimonials, anchor, backgroundColor, quoteColor, starColor, nameColor, children }) => {
  return (
    <section
      className="py-8 relative"
      {...anchorTags(anchor)}
      style={{ backgroundColor: backgroundColor || "#ffffff" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 dark:opacity-50"
        style={{ backgroundImage: `url(${worldMapImg})` }}
      ></div>
      <div className="relative z-10">
        {children && (
          <div className="mb-8">
            {children}
          </div>
        )}
        <Swiper
          className={testimonials.length > 1 ? "mt-16" : ""}
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
            ({ quote, name, qualification, rating, image }, index) => {
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
                          className="fill-current"
                          style={{ color: starColor || "#fb923c" }}
                          size={20}
                        />
                      ))}
                    </div>
                    <p
                      className="mt-4 inline-block max-w-[600px] text-center text-lg"
                      style={{ color: quoteColor }}
                    >
                      {quote}
                    </p>
                    <p
                      className="mt-8 text-lg font-medium"
                      style={{ color: nameColor }}
                    >
                      {name}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: nameColor, opacity: 0.7 }}
                    >
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
