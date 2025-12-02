"use client";
import { Blocks } from "@builder.io/sdk-react";

export const PricingBlocks = ({
  image,
  title,
  price,
  period,
  description,
  features,
  blocks,
  builderBlock,
  builderComponents,
  builderContext,
  builderLinkComponent
}) => {
  return (
    <div
      className="w-full flex flex-col p-6
      text-center bg-white rounded-xl border shadow
      dark:bg-gray-800 dark:text-white"
    >
      {image && (
        <img
          src={image}
          alt={title}
          className="max-w-[80px] mx-auto mb-5"
        />
      )}
      <h3 className="text-3xl font-semibold">
        {title}
      </h3>
      <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-4">
        {description}
      </p>
      {(price || period) && (
        <div className="flex justify-center items-baseline my-4">
          {price && (
            <h3 className="mr-2 text-5xl font-extrabold">
              {price}
            </h3>
          )}
          {period && (
            <span className="text-gray-500 dark:text-gray-400">
              {period}
            </span>
          )}
        </div>
      )}
      {features?.length && (
        <ul role="list" className="mb-8 space-y-4 text-left">
          {features.map((feature, idx) => (
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
        path="component.options.blocks"
        registeredComponents={builderComponents}
        context={builderContext}
        linkComponent={builderLinkComponent}
        blocks={blocks}
      />
    </div>
  );
};
