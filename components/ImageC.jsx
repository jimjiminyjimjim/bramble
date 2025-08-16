import React from "react";
import cx from "classix";

export function ImageC({
  // image,
  // alt = "",
  // maxWidth,
  // alignment = "center",
  // theme = "light",
  // borderRadius = "medium",
  // shadow = false,
  // fillWidth = false,
  // fillHeight = false,
  // className = "",
  ...props
}) {
  // const imageStyle = {
  //   ...(fillWidth && fillHeight ? {
  //     width: "100%",
  //     height: "100%",
  //     objectFit: "cover"
  //   } : fillWidth ? {
  //     width: "100%",
  //     height: "auto"
  //   } : fillHeight ? {
  //     width: "auto",
  //     height: "100%",
  //     objectFit: "cover"
  //   } : {
  //     width: "100%",
  //     height: "auto"
  //   }),
  //   ...(maxWidth && !fillWidth && { maxWidth: `${maxWidth}px` }),
  // };

  // const getAlignmentClasses = () => {
  //   if (fillWidth || fillHeight) {
  //     return ""; // No flex when filling container
  //   }
  //   switch (alignment) {
  //     case "left":
  //       return "flex justify-start";
  //     case "right":
  //       return "flex justify-end";
  //     case "center":
  //     default:
  //       return "flex justify-center";
  //   }
  // };

  // const getContainerClasses = () => {
  //   if (fillWidth && fillHeight) {
  //     return "w-full h-full";
  //   } else if (fillWidth) {
  //     return "w-full";
  //   } else if (fillHeight) {
  //     return "h-full";
  //   }
  //   return "";
  // };

  // const getThemeClasses = () => {
  //   switch (theme) {
  //     case "dark":
  //       return "bg-gray-900";
  //     case "white":
  //       return "bg-white";
  //     case "light":
  //     default:
  //       return "bg-gray-50";
  //   }
  // };

  // const getBorderRadiusClasses = () => {
  //   switch (borderRadius) {
  //     case "none":
  //       return "rounded-none";
  //     case "small":
  //       return "rounded-sm";
  //     case "large":
  //       return "rounded-lg";
  //     case "full":
  //       return "rounded-full";
  //     case "medium":
  //     default:
  //       return "rounded-md";
  //   }
  // };

  // const getShadowClasses = () => {
  //   return shadow ? "shadow-lg" : "";
  // };

  // const { 
  //   children, 
  //   dangerouslySetInnerHTML, 
  //   backgroundSize,
  //   backgroundPosition,
  //   backgroundRepeat,
  //   backgroundImage,
  //   lazy,
  //   fitContent,
  //   aspectRatio,
  //   lockAspectRatio,
  //   fillHeight: _fillHeight,
  //   fillWidth: _fillWidth,
  //   ...safeProps 
  // } = props;

  // if (!image) {
  //   return (
  //     <div className={cx(getAlignmentClasses(), getThemeClasses(), getContainerClasses())}>
  //       <div 
  //         className={cx(
  //           "bg-gray-200 flex items-center justify-center text-gray-500 p-8",
  //           getBorderRadiusClasses(),
  //           getShadowClasses(),
  //           // fillWidth && fillHeight && "w-full h-full",
  //           // fillWidth && !fillHeight && "w-full",
  //           // fillheight && !fillWidth && "h-full",
  //           className
  //         )}
  //         style={imageStyle}
  //       >
  //         No image selected
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div> 
    {/*className={cx(getAlignmentClasses(), getThemeClasses(), getContainerClasses())}>
       <img
        src={image}
        alt={alt}
        className={cx(
          "block",
          getBorderRadiusClasses(),
          getShadowClasses(),
          fillWidth && fillHeight && "w-full h-full",
          fillWidth && !fillHeight && "w-full",
          fillHeight && !fillWidth && "h-full",
          className
        )}
        style={imageStyle}
        {...safeProps}
      /> */}
    </div>
  );
}