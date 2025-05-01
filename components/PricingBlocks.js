"use client";
import { useTheme } from "@/helpers/theme";
import { Blocks } from "@builder.io/sdk-react";

export const PricingBlocks = ({
  title,
  subtitle,
  description,
  pricingBlocks,
  theme,
  builderBlock,
  builderComponents,
  builderContext,
  builderLinkComponent
}) => {
  const colors = useTheme(theme);
  return (
    <section style={{ backgroundColor: colors.primary }}>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {(title || description) && (
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            {title && (
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className="mt-4 text-base lg:text-xl"
                style={{ color: colors.text.body }}
              >
                {subtitle}
              </p>
            )}
            {description && (
              <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-12">
          {pricingBlocks?.map((pricingBlock, index) => {
            console.log("pricingBlocks", pricingBlocks[index]);
            return (
              <div
                key={index}
                className="w-full max-w-[400px] flex flex-col p-6
                text-center bg-white rounded-xl border shadow
                dark:bg-gray-800 dark:text-white"
              >
                {pricingBlock?.image && (
                  <img
                    src={pricingBlock?.image}
                    alt={pricingBlock?.title}
                    className="max-w-[80px] mx-auto mb-5"
                  />
                )}
                <h3
                  className="text-3xl font-semibold"
                  style={{ color: colors?.text.title }}
                >
                  {pricingBlock.title}
                </h3>
                <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-4">
                  {pricingBlock.description}
                </p>
                {(pricingBlock?.price || pricingBlock?.period) && (
                  <div className="flex justify-center items-baseline my-4">
                    {pricingBlock?.price && (
                      <h3
                        className="mr-2 text-5xl font-extrabold"
                        style={{ color: colors?.dark }}
                      >
                        {pricingBlock.price}
                      </h3>
                    )}
                    {pricingBlock.period && (
                      <span className="text-gray-500 dark:text-gray-400">
                        {pricingBlock.period}
                      </span>
                    )}
                  </div>
                )}
                {pricingBlock?.features?.length && (
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    {pricingBlock?.features?.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-3">
                        <svg
                          className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        <p className="text-base">{feature?.description}</p>
                      </li>
                    ))}
                  </ul>
                )}

                <Blocks
                  parent={builderBlock.id}
                  path={`component.options.pricingBlocks.${index}.blocks`}
                  registeredComponents={builderComponents}
                  context={builderContext}
                  linkComponent={builderLinkComponent}
                  blocks={pricingBlock.blocks}
                />
              </div>
            );
          })}
        </div>

        {/* <Blocks
        parent={builderBlock?.id}
        path={`blocks[${0}].blocks`}
        blocks={pricingBlocks?.[0].children}
      /> */}
      </div>
    </section>
  );
};
