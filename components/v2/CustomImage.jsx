import React from "react";
import cx from "classix";

export function CustomImage({
  image,
  alt = "",
  maxWidth,
  alignment = "center",
  fitContent = false,
  className = "",
  builderBlock,
  ...props
}) {
  const imageStyle = {
    ...(fitContent ? {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    } : {
      width: "100%",
      height: "auto",
      objectFit: "contain"
    }),
    ...(maxWidth && !fitContent && { maxWidth: `${maxWidth}px` }),
  };


  // Get alignment classes
  const getAlignmentClasses = () => {
    if (fitContent) {
      return ""; // No flex when fitting content container
    }
    switch (alignment) {
      case "left":
        return "flex justify-start";
      case "right":
        return "flex justify-end";
      case "center":
      default:
        return "flex justify-center";
    }
  };

  const getContainerClasses = () => {
    if (fitContent) {
      return "w-full h-full";
    }
    return "";
  };

  // Get Builder.io selection attributes
  const builderAttributes = builderBlock ? {
    'builder-id': builderBlock.id,
    'builder-model': builderBlock.model,
    'data-builder-component': 'Image'
  } : {};

  // Filter out props that shouldn't be passed to img element
  const { 
    children, 
    dangerouslySetInnerHTML, 
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    backgroundImage,
    lazy,
    fillHeight,
    fillWidth,
    fitContent: _fitContent,
    aspectRatio,
    lockAspectRatio,
    builderBlock: _builderBlock,
    ...safeProps 
  } = props;

  if (!image) {
    return (
      <div 
        className={cx(getAlignmentClasses(), getContainerClasses())}
        {...builderAttributes}
      >
        <div 
          className={cx(
            "bg-gray-200 flex items-center justify-center text-gray-500",
            fitContent && "w-full h-full",
            className
          )}
          style={imageStyle}
        >
          No image selected
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cx("h-full", getAlignmentClasses(), getContainerClasses())}
      {...builderAttributes}
    >
      <img
        src={image}
        alt={alt}
        className={cx(
          "block",
          fitContent && "w-full h-full",
          className
        )}
        style={imageStyle}
        {...safeProps}
      />
    </div>
  );
}
