import React from "react";

export function Section({ 
  children, 
  verticalMargin = "medium",
  horizontalMargin = "medium",
  verticalAlignment = "top",
  backgroundColor,
  fillWidth = true,
  sectionMaxWidth,
  contentMaxWidth = "1400px",
  lazyLoad = false,
  builderBlock,
  builderContext,
  builderComponents,
  builderLinkComponent,
  ...props 
}) {
  // Filter out custom props that shouldn't be passed to DOM
  const {
    fillWidth: _fillWidth,
    fillHeight: _fillHeight,
    maxWidth: maxWidth,
    sectionMaxWidth: _sectionMaxWidth,
    contentMaxWidth: _contentMaxWidth,
    lazyLoad: _lazyLoad,
    builderBlock: _builderBlock,
    builderContext: _builderContext,
    builderComponents: _builderComponents,
    builderLinkComponent: _builderLinkComponent,
    verticalMargin: _verticalMargin,
    horizontalMargin: _horizontalMargin,
    verticalAlignment: _verticalAlignment,
    ...safeProps
  } = props;
  // Define vertical margin classes
  const getVerticalMarginClasses = (marginSize) => {
    switch (marginSize) {
      case "none":
        return "";
      case "small":
        return "py-8";
      case "medium":
        return "py-12 lg:py-16";
      case "large":
        return "py-20 lg:py-32";
      default:
        return "";
    }
  };

  // Define horizontal margin classes
  const getHorizontalMarginClasses = (marginSize) => {
    switch (marginSize) {
      case "none":
        return "";
      case "small":
        return "px-4";
      case "medium":
        return "px-6";
      case "large":
        return "px-8 lg:px-12";
      default:
        return "";
    }
  };

  const verticalMarginClasses = getVerticalMarginClasses(verticalMargin);
  const horizontalMarginClasses = getHorizontalMarginClasses(horizontalMargin);

  // Define gap classes for spacing between children (not above first child)
  const getGapClasses = (marginSize) => {
    switch (marginSize) {
      case "none":
        return "flex flex-col";
      case "small":
        return "flex flex-col gap-3 lg:gap-4";
      case "large":
        return "flex flex-col gap-8 lg:gap-12";
      default: // medium
        return "flex flex-col gap-6 lg:gap-8";
    }
  };

  // Define vertical alignment classes
  const getVerticalAlignmentClasses = (alignment) => {
    switch (alignment) {
      case "top":
        return "justify-start";
      case "center":
        return "justify-center";
      case "bottom":
        return "justify-end";
      case "stretch":
        return "justify-stretch";
      default:
        return "justify-start";
    }
  };

  const gapClasses = getGapClasses(verticalMargin);
  const alignmentClasses = getVerticalAlignmentClasses(verticalAlignment);
  
  // Get Builder.io selection attributes
  const builderAttributes = builderBlock ? {
    'builder-id': builderBlock.id,
    'builder-model': builderBlock.model,
    'data-builder-component': 'Section'
  } : {};
  
  
  // Content container classes and style - controls inner content width
  const heightClasses = 'h-full';
  const containerClasses = fillWidth 
    ? `${horizontalMarginClasses || 'px-6'} mx-auto w-full ${verticalMarginClasses} ${gapClasses} ${alignmentClasses} ${heightClasses}` 
    : `${verticalMarginClasses} ${gapClasses} ${alignmentClasses} ${heightClasses}`;
  
  const containerStyle = fillWidth ? { maxWidth: contentMaxWidth}  : {  };

  return (
    <section 
      className={'h-full'}
      style={{
        backgroundColor,
        ...(!fillWidth && { maxWidth: contentMaxWidth, margin: '0 auto' })
      }}
      {...builderAttributes}
      {...(lazyLoad && { 'data-lazy': 'true' })}
      {...safeProps}
    >
      <div 
        className={containerClasses}
        style={containerStyle}
      >
        {children}
      </div>
    </section>
  );
}