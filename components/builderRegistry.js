"use client";

import { PricingBlocks } from "@/components/PricingBlocks";
import { register } from "@builder.io/sdk-react";
import { HeroImage } from "@/components/HeroImage";
import { Hero } from "@/components/Hero";
import { OnePager } from "@/components/OnePager";

import { Stats } from "@/components/Stats";
import { Feature } from "@/components/Feature";
import { AppFeatures } from "@/components/AppFeatures";
import { FeaturesList } from "@/components/v2/FeaturesList";
import { FeatureGrid } from "@/components/FeatureGrid";
import { FeatureGridNew } from "@/components/v2/FeatureGridNew";

import { Screenshots } from "@/components/Screenshots";

import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { FooterNew } from "@/components/v2/FooterNew";
import { MinFooter } from "@/components/MinFooter";

import { Works } from "@/components/Works";
import { Testimonial } from "@/components/Testimonial";
import { Download } from "@/components/Download";
import { SignUp } from "@/components/SignUp";
import { Popup } from "@/components/Popup";
import { PopupNew } from "@/components/v2/PopupNew";
import { SoldOut } from "@/components/SoldOut";
import { TextBlock } from "@/components/TextBlock";
import { TextBlockNew } from "@/components/v2/TextBlockNew";
import { Topbar } from "@/components/Topbar";
import { TopbarNew } from "@/components/v2/TopbarNew";
import { Carousel } from "@/components/CustomTabs";
import { CustomImage } from "@/components/v2/CustomImage";
import { Pill } from "@/components/Pill";
import { Button } from "@/components/Button";
import { Section } from "@/components/v2/Section";

import { TandCs } from "@/components/TandCs";

import { Mailchimp } from "@/components/Mailchimp";

// this array can contain as many custom components as you want

// register('editor.settings', {
//   customInsertMenu: true
// });

// register('insertMenu', {
//   name: 'Main Blocks',
//   priority: 1,
//   items: [
//     { name: 'Hero', item: 'Hero' }
//   ],
// })

// register('insertMenu', {
//   name: 'Layout Actions',
//   priority: 2,
//     { name: 'Hero', item: 'Hero' }
//   ],
// })

register("insertMenu", {
  name: "V2",
  priority: 2,
  items: [
    { name: "Navigation", item: "v2: Topbar New" },
    { name: "Section & Spacing", item: "Core:Section" },
    { name: "Text Block v2", item: "TextBlockNew" },
    { name: "Features List", item: "FeaturesList" },
    { name: "Features Grid", item: "FeatureGridNew" },
    { name: "v2: Footer", item: "v2: Footer" },
    { name: "v2: Popup", item: "v2: Popup" },
    { name: "v2: Pricing Blocks", item: "v2: Pricing Blocks" }

  ]
});

export const customComponents = [
  {
    component: Carousel,
    image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/images.svg",
    name: "Carousel",
    /** To accept children in your custom component and by default it is false */
    canHaveChildren: true,
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true
    },
    inputs: [
      {
        name: "slides",
        type: "list",
        subFields: [],
        defaultValue: [
          {
            "@type": "@builder.io/sdk:Element",
            component: {
              name: "Text",
              options: {
                text: "Carousel Text - Im editable"
              }
            }
          }
        ]
      }
    ]
  },
  {
    component: Topbar,
    name: "Topbar",
    canHaveChildren: true,
    inputs: [
      {
        name: "logoOverride",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
      },
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      }
    ]
  },
  {
    component: TopbarNew,
    name: "v2: Topbar New",
    canHaveChildren: true,
    noWrap: true,
    canReceiveBuilderProps: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
      builderContext: true,
      builderComponents: true,
      builderLinkComponent: true
    },
    inputs: [
      {
        name: "logo",
        type: "uiBlocks",
        defaultValue: []
      },
      {
        name: "logoUrl",
        type: "string",
        defaultValue: "/",
        helperText: "URL for the logo link (defaults to home page)"
      },
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      {
        name: "maxWidth",
        type: "number",
        helperText: "Maximum width in pixels (optional)",
        defaultValue: 1400
      },
      {
        name: "backgroundColor",
        type: "color",
        helperText: "Custom background color (overrides theme color)"
      },
      {
        name: "textColor",
        type: "color",
        helperText: "Custom text color (overrides theme color)"
      },
      {
        name: "navItems",
        type: "list",
        defaultValue: [{ blocks: [] }],
        subFields: [
          {
            name: "name",
            type: "string",
            defaultValue: "Nav Item 1"
          },
          {
            name: "url",
            type: "string"
          },
          {
            name: "linkType",
            type: "enum",
            enum: ["internal", "external", "scrollTo"],
            defaultValue: "internal",
            helperText: "External will open new window"
          }
        ]
      }
    ]
  },
  {
    component: Mailchimp,
    name: "Mailchimp Input",
    noWrap: true,
    images:
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/input-cursor-text.svg",
    inputs: [
      {
        name: "stack",
        type: "enum",
        enum: ["column", "row"],
        defaultValue: "row"
      },
      {
        name: "alignment",
        type: "enum",
        enum: ["left", "center"],
        defaultValue: "center"
      },
      {
        name: "mailchimpTags",
        defaultValue: ""
      },
      {
        name: "CTA",
        defaultValue: "Sign up for our newsletter"
      },
      {
        name: "placeholder",
        defaultValue: "Please enter your email"
      },
      {
        name: "ctaColor",
        type: "color"
      },
      {
        name: "successMessage",
        type: "string",
        defaultValue: "Thank you for signing up!"
      },
      { name: "mailchimpFormCode", type: "code" },
      { name: "ctaText", type: "string", defaultValue: "Click Me" },
      {
        name: "rounded",
        type: "boolean",
        defaultValue: true,
        helperText: "Use rounded corners for input and button"
      },
      {
        name: "maxWidth",
        type: "number",
        helperText: "Maximum width in pixels (optional)"
      }
    ]
  },
  {
    name: "v2: Pricing Blocks",
    component: PricingBlocks,
    canHaveChildren: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
      builderContext: true,
      builderComponents: true,
      builderLinkComponent: true
    },
    inputs: [
       {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          },
          {
            name: "title",
            type: "string",
            defaultValue: "Starter"
          },
          {
            name: "price",
            type: "string",
            defaultValue: "$29"
          },
          {
            name: "period",
            type: "string"
          },
          {
            name: "description",
            type: "string",
            defaultValue: "Best option for personal use"
          },
          {
            name: "blocks",
            type: "uiBlocks",
            defaultValue: []
          }
    ]
  },
  {
    component: Hero,
    name: "Hero",
    canHaveChildren: true,
    // noWrap: true,
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "bounce", type: "boolean" },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "margin",
        type: "enum",
        enum: ["none", "small", "medium", "large"],
        defaultValue: "light"
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand"
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand"
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
      },
      { name: "imageOpacity", type: "number", defaultValue: 1 },
      {
        name: "imageMaxHeight",
        type: "string",
        defaultValue: "550px",
        helperText: "must include px or %"
      },
      {
        name: "imageConstraint",
        type: "enum",
        enum: ["cover", "contain"]
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "svg"]
      },
      { name: "backgroundOpacity", type: "number", defaultValue: 0.6 },
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#ffffff"
      },
      {
        name: "downloads",
        type: "enum",
        enum: ["Show App Store", "Don't Show App Store"]
      },
      {
        name: "fullScreen",
        type: "boolean"
      }
    ]
  },
  {
    component: HeroImage,
    name: "HeroImage",
    canHaveChildren: true,
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true
    },
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      { name: "alignment", type: "enum", enum: ["left", "center", "right"] },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand"
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        defaultValue:
          "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d"
      }
    ]
  },
  {
    component: TextBlock,
    name: "TextBlock",
    canHaveChildren: true,
    noWrap: true,
    shouldReceiveBuilderProps: {
      builderBlock: true
    },
    inputs: [
      // {
      //   name: "columnTest",
      //   type: "list",
      //   subFields: [
      //     {
      //       name: "children",
      //       type: "uiBlocks"
      //     }
      //   ]
      // },
      { name: "alignment", type: "enum", enum: ["left", "center", "right"] },
      {
        name: "verticalAlignment",
        type: "enum",
        enum: ["top", "middle", "bottom"],
        defaultValue: "middle",
        helperText: "Vertical alignment of the content within the section"
      },
      {
        name: "textSize",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium"
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        defaultValue:
          "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d"
      },
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      {
        name: "textColor",
        type: "color",
        helperText:
          "Custom text color (overrides theme). Subtitle and body always use this color, title uses this unless gradient is enabled."
      },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "useGradientText",
        type: "boolean",
        defaultValue: false
      },
      {
        name: "gradientColor1",
        type: "color",
        defaultValue: "#3B82F6",
        showIf: "options.get('useGradientText') === true"
      },
      {
        name: "gradientColor2",
        type: "color",
        defaultValue: "#8B5CF6",
        showIf: "options.get('useGradientText') === true"
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "body",
        type: "richText",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand"
      },
      {
        name: "noPadding",
        type: "boolean",
        defaultValue: true,
        helperText: "Remove surrounding padding/margins from the component"
      }
    ]
  },
  {
    component: TextBlockNew,
    name: "TextBlockNew",
    canHaveChildren: true,
    noWrap: true,
    shouldReceiveBuilderProps: {
      builderBlock: true
    },
    inputs: [
      // {
      //   name: "columnTest",
      //   type: "list",
      //   subFields: [
      //     {
      //       name: "children",
      //       type: "uiBlocks"
      //     }
      //   ]
      // },
      { name: "alignment", type: "enum", enum: ["left", "center", "right"] },
      {
        name: "verticalAlignment",
        type: "enum",
        enum: ["top", "middle", "bottom"],
        defaultValue: "middle",
        helperText: "Vertical alignment of the content within the section"
      },
      {
        name: "textSize",
        type: "enum",
        enum: ["small", "medium-small", "medium", "large", "xlarge"],
        defaultValue: "medium"
      },
      {
        name: "textColor",
        type: "color",
        helperText:
          "Custom heading color (overrides theme). Only applies to title when gradient is disabled."
      },
      {
        name: "subtitleBodyColor",
        type: "color",
        helperText: "Custom color for subtitle text (overrides theme)."
      },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "useGradientText",
        type: "boolean",
        defaultValue: false
      },
      {
        name: "gradientColor1",
        type: "color",
        defaultValue: "#3B82F6",
        showIf: "options.get('useGradientText') === true"
      },
      {
        name: "gradientColor2",
        type: "color",
        defaultValue: "#8B5CF6",
        showIf: "options.get('useGradientText') === true"
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "body",
        type: "richText",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand"
      },
      {
        name: "noPadding",
        type: "boolean",
        defaultValue: true,
        helperText: "Remove surrounding padding/margins from the component"
      },
      {
        name: "maxWidth",
        type: "number",
        helperText: "Maximum width in pixels for text content (optional)"
      },
      {
        name: "url",
        type: "string",
        defaultValue: "",
        helperText: "URL for clickable title (if applicable)"
      },
      {
        name: "linkType",
        type: "enum",
        enum: ["internal", "external", "scrollTo"],
        defaultValue: "internal",
        helperText: "External will open new window, scrollTo adds # prefix"
      }
    ]
  },
  {
    component: SignUp,
    name: "SignUp",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand"
      },
      {
        name: "maichimpUrl",
        type: "string"
      }
    ]
  },
  {
    component: Screenshots,
    name: "Screenshots",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      {
        name: "heading",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity"
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app."
      },
      {
        name: "screens",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing"
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time."
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          }
        ]
      }
    ]
  },
  {
    component: AppFeatures,
    name: "AppFeatures",
    canHaveChildren: true,
    image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/list-check.svg",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      {
        name: "heading",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity"
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app."
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
      },
      {
        name: "imageScale",
        type: "range", // 👈 slider in the Builder editor
        min: 0,
        max: 100,
        defaultValue: 0,
        helperText: "0 = fit width, 100 = fill panel"
      },
      {
        name: "iconColor",
        type: "color",
        defaultValue: "#3B82F6"
      },
      {
        name: "align",
        type: "enum",
        enum: ["left", "center", "right"],
        defaultValue: "center"
      },
      {
        name: "features",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing"
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time."
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle"
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          }
        ]
      }
    ]
  },
  {
    component: FeaturesList,
    name: "FeaturesList",
    canHaveChildren: true,
    image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/list-ul.svg",
    inputs: [
      { name: "anchor", type: "string" },
      {
        name: "iconColor",
        type: "color",
        defaultValue: "#3B82F6"
      },
      {
        name: "align",
        type: "enum",
        enum: ["left", "center", "right"],
        defaultValue: "center"
      },
      {
        name: "size",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Size of feature images and icons"
      },
      {
        name: "features",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing"
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time."
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle"
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          }
        ]
      }
    ]
  },
  {
    component: FeatureGrid,
    name: "FeatureGrid",
    canHaveChildren: true,
    image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/grid-fill.svg",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      {
        name: "heading",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity"
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app."
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
      },
      {
        name: "features",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing"
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time."
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle"
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          }
        ]
      }
    ]
  },
  {
    component: FeatureGridNew,
    name: "FeatureGridNew",
    canHaveChildren: true,
    image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/grid-fill.svg",
    inputs: [
      { name: "anchor", type: "string" },
      {
        name: "size",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Size of feature icons"
      },
      {
        name: "align",
        type: "enum",
        enum: ["left", "center", "right"],
        defaultValue: "left",
        helperText: "Position of icons relative to text"
      },
      {
        name: "textColor",
        type: "color",
        helperText: "Custom text color for titles and descriptions"
      },
      {
        name: "iconColor",
        type: "color",
        helperText: "Custom color for feature icons"
      },
      {
        name: "maxWidth",
        type: "number",
        helperText: "Maximum width in pixels for text content (optional)"
      },
      {
        name: "features",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing"
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time."
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle"
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          }
        ]
      }
    ]
  },
  {
    component: Stats,
    name: "Stats",
    image: "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/card-text.svg",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      {
        name: "margin",
        type: "enum",
        enum: ["none", "small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Controls the spacing around the component"
      },
      {
        name: "size",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Controls the overall text size of the component"
      },
      {
        name: "title",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity"
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app."
      },
      {
        name: "stats",
        type: "list",
        subFields: [
          {
            name: "alignment",
            type: "enum",
            enum: ["center", "left"],
            defaultValue: "center"
          },
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing"
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time."
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle"
          },
          {
            name: "iconColor",
            type: "color",
            defaultValue: "#3B82F6"
          }
        ]
      }
    ]
  },
  {
    component: Popup,
    name: "Popup",
    canHaveChildren: true,
    image:
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/window-stack.svg",
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true,
      builderContext: true,
      builderComponents: true,
      builderLinkComponent: true
    },
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "buttonColor", type: "color", defaultValue: "#3B82F6" },
      { name: "textColor", type: "color", defaultValue: "#FFFFFF" },
      {
        name: "size",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Size of the button"
      },
      { name: "icon", type: "string" },
      {
        name: "iconPosition",
        type: "enum",
        enum: ["left", "right"],
        defaultValue: "left",
        showIf: "options.icon"
      },
      {
        name: "mailchimpForm",
        type: "boolean",
        defaultValue: false,
        helperText: "Use modern Mailchimp form instead of embed code"
      },
      {
        name: "includeNameField",
        type: "boolean",
        defaultValue: false,
        showIf: "options.get('mailchimpForm') === false",
        helperText: "Include a name field in the Mailchimp form"
      },
      {
        name: "mailchimpTags",
        type: "string",
        defaultValue: "",
        showIf: "options.get('mailchimpForm') === false",
        helperText:
          "Comma-separated tags for Mailchimp (e.g., popup,newsletter)"
      },
      {
        name: "formCode",
        type: "code",
        showIf: "options.get('mailchimpForm') !== false",
        helperText: "HTML embed code (only shown when not using Mailchimp form)"
      },
      { name: "ctaText", type: "string", defaultValue: "Click Me" },
      { name: "popupTitle", type: "string", defaultValue: "Subscribe" }
    ]
  },
  {
    component: PopupNew,
    name: "v2: Popup",
    canHaveChildren: true,
    canReceiveBuilderProps: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
      builderContext: true,
      builderComponents: true,
      builderLinkComponent: true
    },
    image:
      "https://cdn.jsdelivr.net/npm/bootstrap-icons/icons/window-stack.svg",
    inputs: [
      {
        name: "column1",
        type: "uiBlocks",
        defaultValue: []
      },
      { name: "ctaText", type: "string" },
      { name: "textLink", type: "boolean"},
      { name: "buttonColor", type: "color", defaultValue: "#3B82F6" },
      { name: "textColor", type: "color", defaultValue: "#FFFFFF" },
      {
        name: "size",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Size of the button"
      },
      {
        name: "width",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Width of the popup modal"
      },
      { name: "icon", type: "string" },
      {
        name: "iconPosition",
        type: "enum",
        enum: ["left", "right"],
        defaultValue: "left",
        showIf: "options.icon"
      },
      {
        name: "rounded",
        type: "boolean",
        defaultValue: true,
        helperText: "Use rounded corners for the button"
      }
    ]
  },
  {
    component: SoldOut,
    name: "SoldOut",
    canHaveChildren: true,
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true
    },
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "colour", type: "color" },
      { name: "mailchimpForm", type: "boolean" },
      { name: "formCode", type: "code" },
      { name: "ctaText", type: "string", defaultValue: "Click Me" },
      {
        name: "ctaBody",
        type: "longText",
        defaultValue: "This is some text that describes the popup"
      },
      {
        name: "ctaPopupTitle",
        type: "longText",
        defaultValue: "This is some text that describes the popup"
      },
      {
        name: "ctaPopupBody",
        type: "longText",
        defaultValue: "This is some text that describes the popup"
      }
    ]
  },
  {
    component: TandCs,
    name: "TandCs",
    canHaveChildren: true,
    inputs: [
      { name: "ctaText", type: "string" },
      { name: "colour", type: "color" }
    ]
  },
  {
    component: FAQ,
    name: "FAQ",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "title", type: "string", defaultValue: "App Inquiries?" },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "Unlocking Answers: Your Guide to AI Mobile App Queries."
      },
      { name: "anchor", type: "string" },
      {
        name: "expandable",
        type: "boolean",
        defaultValue: true,
        helperText:
          "Whether FAQs can be expanded/collapsed or always show full content"
      },
      {
        name: "faqs",
        type: "list",
        defaultValue: [
          {
            question: "What is this product?",
            answer:
              "This is a comprehensive solution designed to help you achieve your goals efficiently and effectively."
          },
          {
            question: "How does it work?",
            answer:
              "Our product uses advanced technology to streamline your workflow and provide you with the tools you need to succeed."
          },
          {
            question: "Is there a free trial?",
            answer:
              "Yes, we offer a 14-day free trial so you can experience all the features before making a commitment."
          }
        ],
        subFields: [
          {
            name: "question",
            type: "string",
            defaultValue: "Frequently Asked Question",
            helperText: "The question text"
          },
          {
            name: "answer",
            type: "longText",
            defaultValue:
              "This is the answer to the frequently asked question. You can provide detailed information here.",
            helperText: "The answer text (supports multiple lines)"
          }
        ]
      }
    ]
  },
  {
    component: Footer,
    name: "Footer",
    canHaveChildren: true,
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
      { name: "overlay", type: "boolean" },
      { name: "horizontal", type: "boolean" }
    ]
  },
  {
    component: FooterNew,
    name: "v2: Footer",
    canHaveChildren: true,
    inputs: [
      {
        name: "logo",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        helperText: "Custom logo for the footer (optional, defaults to site logo)"
      },
      {
        name: "backgroundColor",
        type: "color",
        helperText: "Background color for the footer"
      },
      {
        name: "textColor",
        type: "color",
        defaultValue: "#ffffff",
        helperText: "Text color for footer content and social icon backgrounds"
      },
      {
        name: "copyright",
        type: "string",
        defaultValue: "",
        helperText: "Copyright message (e.g., '© 2024 Company Name. All rights reserved')"
      },
      {
        name: "tiktokUrl",
        type: "string",
        defaultValue: "",
        helperText: "TikTok profile URL (icon will appear if URL is provided)"
      },
      {
        name: "instagramUrl",
        type: "string",
        defaultValue: "",
        helperText: "Instagram profile URL (icon will appear if URL is provided)"
      },
      {
        name: "facebookUrl",
        type: "string",
        defaultValue: "",
        helperText: "Facebook page URL (icon will appear if URL is provided)"
      },
      {
        name: "twitterUrl",
        type: "string",
        defaultValue: "",
        helperText: "Twitter/X profile URL (icon will appear if URL is provided)"
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
      { name: "overlay", type: "boolean" },
      { name: "horizontal", type: "boolean" }
    ]
  },
  {
    component: MinFooter,
    name: "MinFooter",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" }
    ]
  },
  {
    component: Works,
    name: "Works",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" }
    ]
  },
  {
    component: Testimonial,
    name: "Testimonial",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string", defaultValue: "Testimonials" },
      {
        name: "testimonials",
        type: "list",
        subFields: [
          {
            name: "name",
            type: "string",
            defaultValue: "Bob Budskin"
          },
          {
            name: "qualification",
            type: "string",
            defaultValue: "Teacher"
          },
          {
            name: "quote",
            type: "longText",
            defaultValue:
              "My son loves his PixelPatrol. It’s like a friend that helps him make smart choices online."
          },
          {
            name: "rating",
            type: "enum",
            enum: [
              {
                label: "1 star",
                value: "1"
              },
              {
                label: "2 stars",
                value: "2"
              },
              {
                label: "3 stars",
                value: "3"
              },
              {
                label: "4 stars",
                value: "4"
              },
              {
                label: "5 stars",
                value: "5"
              }
            ]
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle"
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"]
          }
        ]
      }
    ]
  },
  {
    component: Download,
    name: "Download",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" }
    ]
  },
  {
    component: CustomImage,
    name: "Image", // This overrides the default Builder.io Image component
    override: true,
    noWrap: true,
    shouldReceiveBuilderProps: {
      builderBlock: true
    },
    inputs: [
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
        required: true
      },
      {
        name: "alt",
        type: "string",
        defaultValue: "",
        helperText: "Alt text for accessibility"
      },
      {
        name: "alignment",
        type: "enum",
        enum: ["left", "center", "right"],
        defaultValue: "center",
        helperText: "Horizontal image alignment"
      },
      {
        name: "verticalAlignment",
        type: "enum",
        enum: ["top", "center", "bottom"],
        defaultValue: "center",
        helperText: "Vertical image alignment"
      },
      {
        name: "maxWidth",
        type: "number",
        helperText: "Maximum width in pixels (optional)"
      },
      {
        name: "aspectRatio",
        type: "number",
        min: 0.1,
        max: 5,
        step: 0.1,
        defaultValue: 1,
        helperText:
          "Aspect ratio (width/height). 1 = square, 1.77 = 16:9, 0.75 = 3:4"
      },
      {
        name: "fitContent",
        type: "boolean",
        defaultValue: false,
        helperText: "Fit image to content container"
      },
      {
        name: "lazy",
        type: "boolean",
        defaultValue: true,
        helperText: "Enable lazy loading"
      },
      {
        name: "lockAspectRatio",
        type: "boolean",
        defaultValue: false,
        helperText: "Lock aspect ratio when resizing"
      }
    ]
  },
  {
    component: Pill,
    name: "Pill",
    inputs: [
      {
        name: "text",
        type: "string",
        defaultValue: "Pill Text",
        helperText: "Text content for the pill"
      },
      {
        name: "size",
        type: "enum",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Size of the pill"
      },
      {
        name: "alignment",
        type: "enum",
        enum: ["left", "center", "right"],
        defaultValue: "center",
        helperText: "Alignment of the pill"
      },
      {
        name: "cornerStyle",
        type: "enum",
        enum: ["rounded", "square"],
        defaultValue: "rounded",
        helperText: "Corner style of the pill"
      },
      {
        name: "aspectRatio",
        type: "number",
        min: 0.1,
        max: 5,
        step: 0.1,
        defaultValue: 1,
        helperText:
          "Aspect ratio (width/height). 1 = square, 2 = wide rectangle, 0.5 = tall rectangle"
      },
      {
        name: "margin",
        type: "enum",
        enum: ["none", "small", "medium", "large"],
        defaultValue: "none",
        helperText: "Vertical margin (top and bottom)"
      },
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#3B82F6",
        helperText: "Background color of the pill"
      },
      {
        name: "textColor",
        type: "color",
        defaultValue: "#FFFFFF",
        helperText: "Text color of the pill"
      }
    ]
  },
  {
    component: Button,
    name: "Core:Button",
    override: true,
    noWrap: true,
    inputs: [
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#3B82F6",
        helperText: "Background color of the button"
      },
      {
        name: "textColor",
        type: "color",
        defaultValue: "#FFFFFF",
        helperText: "Text color of the button"
      },
      {
        name: "rounded",
        type: "boolean",
        defaultValue: true,
        helperText: "Whether the button should have rounded corners"
      },
      {
        name: "maxWidth",
        type: "string",
        defaultValue: "500px",
        helperText:
          "Maximum width of the button (e.g., '200px', '100%', 'auto')"
      },
      {
        name: "size",
        type: "string",
        enum: ["small", "medium", "large"],
        defaultValue: "medium",
        helperText: "Size of the button"
      },
      {
        name: "url",
        type: "string",
        defaultValue: "",
        helperText: "URL for the button (if applicable)"
      },
      {
        name: "linkType",
        type: "enum",
        enum: ["internal", "external", "scrollTo"],
        defaultValue: "internal",
        helperText: "External will open new window"
      },
      {
        name: "tagManagerEvent",
        type: "string",
        defaultValue: "",
        helperText: "Event name for Google Tag Manager (leave blank to disable)"
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: false,
        helperText: "Whether the button is disabled"
      },
      {
        name: "text",
        type: "string",
        defaultValue: "Click Me",
        helperText: "Button text content"
      }
    ]
  },
  {
    component: Section,
    name: "Core:Section",
    override: true,
    canHaveChildren: true,
    noWrap: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
      builderContext: true,
      builderComponents: true,
      builderLinkComponent: true
    },
    inputs: [
      {
        name: "anchorLink",
        type: "string",
        defaultValue: "",
        helperText: "Anchor link for the section"
      },
      {
        name: "verticalMargin",
        type: "enum",
        enum: ["none", "small", "medium", "large"],
        defaultValue: "medium",
        helperText:
          "Controls the vertical spacing (top and bottom) around the section"
      },
      {
        name: "horizontalMargin",
        type: "enum",
        enum: ["none", "small", "medium", "large"],
        defaultValue: "medium",
        helperText:
          "Controls the horizontal spacing (left and right) around the section"
      },
      {
        name: "verticalAlignment",
        type: "enum",
        enum: ["top", "center", "bottom", "stretch"],
        defaultValue: "top",
        helperText:
          "Controls the vertical alignment of content within the section"
      },
      {
        name: "gap",
        type: "enum",
        enum: ["none", "small", "medium", "large", "xlarge", "xxlarge"],
        defaultValue: "medium",
        helperText:
          "Controls the spacing between items within the section"
      },
      {
        name: "backgroundColor",
        type: "color",
        helperText: "Background color for the section"
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg", "webp"],
        helperText: "Background image for the section"
      },
      {
        name: "aspectRatio",
        type: "enum",
        enum: ["fluid", "3:2", "16:9"],
        defaultValue: "fluid",
        helperText: "Aspect ratio for the section (fluid = no fixed ratio)"
      },
      {
        name: "rounded",
        type: "boolean",
        defaultValue: false,
        helperText: "Apply rounded corners to the section"
      },
      {
        name: "roundedSize",
        type: "string",
        defaultValue: "1rem",
        helperText: "Border radius size (e.g., '1rem', '8px', '2rem')",
        showIf: "options.get('rounded') === true"
      },
      {
        name: "fillWidth",
        type: "boolean",
        defaultValue: true,
        helperText: "Make the section fill the full width of the container"
      },
      {
        name: "fillHeight",
        type: "boolean",
        defaultValue: false,
        helperText:
          "Make the section fill the full height of its parent container"
      },
      {
        name: "contentMaxWidth",
        type: "string",
        defaultValue: "1400px",
        helperText:
          "Maximum width of the content within the section (e.g., '1200px', '800px')"
      },
      {
        name: "lazyLoad",
        type: "boolean",
        defaultValue: false,
        helperText: "Enable lazy loading for the section content"
      }
    ]
  }
];

export const componentMetadata = customComponents.map(({ name, inputs }) => ({
  name,
  inputs
}));

// Register all custom components with Builder.io
customComponents.forEach((componentConfig) => {
  register("component", componentConfig);
});
