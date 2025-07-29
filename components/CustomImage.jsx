import React from "react";
import cx from "classix";

export function CustomImage({
  image,
  alt = "",
  maxWidth,
  alignment = "center",
  className = "",
  ...props
}) {
  const imageStyle = {
    width: "100%",
    height: "auto",
    ...(maxWidth && { maxWidth: `${maxWidth}px` }),
  };


  // Get alignment classes
  const getAlignmentClasses = () => {
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

  // Filter out props that shouldn't be passed to img element
  const { 
    children, 
    dangerouslySetInnerHTML, 
    backgroundSize,
    backgroundPosition,
    backgroundRepeat,
    backgroundImage,
    lazy,
    fitContent,
    aspectRatio,
    lockAspectRatio,
    ...safeProps 
  } = props;

  if (!image) {
    return (
      <div className={cx(getAlignmentClasses())}>
        <div 
          className={cx("bg-gray-200 flex items-center justify-center text-gray-500", className)}
          style={imageStyle}
        >
          No image selected
        </div>
      </div>
    );
  }

  return (
    <div className={cx(getAlignmentClasses())}>
      <img
        src={image}
        alt={alt}
        className={cx(className, "block")}
        style={imageStyle}
        {...safeProps}
      />
    </div>
  );
}
