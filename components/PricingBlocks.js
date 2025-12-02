"use client";
import { Blocks } from "@builder.io/sdk-react";

export const PricingBlocks = ({
  image,
  title,
  price,
  period,
  description,
  blocks,
  builderBlock,
  builderComponents,
  builderContext,
  builderLinkComponent
}) => {
  return (
    <div
      className="w-full h-full flex flex-col p-6
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

      <div className="flex-1 flex flex-col">
        <Blocks
          parent={builderBlock.id}
          path="component.options.blocks"
          registeredComponents={builderComponents}
          context={builderContext}
          linkComponent={builderLinkComponent}
          blocks={blocks}
        />
      </div>
    </div>
  );
};
