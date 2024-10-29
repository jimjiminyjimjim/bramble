"use client";

import mobile3Img from "@/assets/images/landing/mobile-3.png";
import { Card } from "react-daisyui";
import { DynamicIcon } from "@/components/Icon";
import { anchorTags } from "@/helpers/anchorTags";

export const Organize = ({ heading, description, features, integrations, anchor }) => {
  const splitIndex = Math.ceil(features?.length / 2);
  const leftFeatures = features?.slice(0, splitIndex);
  const rightFeatures = features?.slice(splitIndex);


  return (
    <section className="py-8 lg:py-28"  {...anchorTags(anchor)}>
      <div className="container">
        <div className="text-center mb-8 lg:mb-16">
          <h3 className="text-xl font-semibold lg:text-3xl">{heading}</h3>
          <p className="mt-4 text-base lg:text-lg">{description}</p>
        </div>
        <div className={`grid gap-16 lg:grid-cols-2 xl:gap-24`}>
          <div className="flex flex-col justify-between">
            <div className="space-y-8">
              {leftFeatures?.map((feature, index) => (
                <div className="flex items-start gap-5" key={index}>
                  <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                    <DynamicIcon iconName={feature.icon}/>
                  </div>
                  <div>
                    <p className="text-base font-medium">{feature.title}</p>
                    <p className="mt-1 text-base-content/80">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {features?.length <= 4 ? (
            <div className="relative flex justify-center items-center">
              <img alt="Mobile 3" className="h-[500px]" src={mobile3Img.src} />
              <div className="absolute end-0 top-[30%]">
                <Card className="bg-base-100 shadow transition-all hover:shadow-lg">
                  <Card.Body className="flex flex-row items-center gap-3 p-3">
                    <div className="flex items-center justify-center rounded-full bg-primary p-2">
                      {/* <BlocksIcon className="size-6 text-primary-content" /> */}
                    </div>
                    <div>
                      <p className="text-xl/none font-semibold">{integrations}</p>
                      <p>Third Party Integrations</p>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-between">
              <div className="space-y-8">
                {rightFeatures?.map((feature, index) => (
                  <div className="flex items-start gap-5" key={index}>
                    <div className="inline-flex p-2 items-center justify-center rounded bg-primary/20 font-medium text-primary">
                       <DynamicIcon iconName={feature.icon}/>
                    </div>
                    <div>
                      <p className="text-base font-medium">{feature.title}</p>
                      <p className="mt-1 text-base-content/80">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};