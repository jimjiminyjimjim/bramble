"use client";

import { PricingBlocks } from "@/components/PricingBlocks";
import { register } from "@builder.io/sdk-react";
import { HeroImage } from "@/components/HeroImage";
import { Hero } from "@/components/Hero";
import { OnePager } from "@/components/OnePager";

import { Stats } from "@/components/Stats";
import { Feature } from "@/components/Feature";
import { AppFeatures } from "@/components/AppFeatures";
import { FeatureGrid } from "@/components/FeatureGrid";

import { Screenshots } from "@/components/Screenshots";

import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MinFooter } from "@/components/MinFooter";

import { Works } from "@/components/Works";
import { Testimonial } from "@/components/Testimonial";
import { Download } from "@/components/Download";
import { SignUp } from "@/components/SignUp";
import { Popup } from "@/components/Popup";
import { SoldOut } from "@/components/SoldOut";
import { TextBlock } from "@/components/TextBlock";
import { Topbar } from "@/components/Topbar";
import { Carousel } from "@/components/CustomTabs";

import { TandCs } from "@/components/TandCs";

import { Mailchimp } from "@/components/Mailchimp";

// this array can contain as many custom components as you want
export const customComponents = [
  {
    component: Carousel,
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
    component: Mailchimp,
    name: "Mailchimp Input",
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
      { name: "ctaText", type: "string", defaultValue: "Click Me" }
    ]
  },
  {
    name: "Pricing Blocks",
    component: PricingBlocks,
    canHaveChildren: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
      builderContext: true,
      builderComponents: true,
      builderLinkComponent: true
    },
    inputs: [
      { name: "anchor", type: "string" },
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light"
      },
      { name: "title", type: "string" },
      {
        name: "subtitle",
        type: "string",
        defaultValue: "Best option for personal use"
      },
      { name: "description", type: "string" },
      {
        name: "pricingBlocks",
        type: "list",
        defaultValue: [{ blocks: [] }],
        subFields: [
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
            name: "features",
            type: "list",
            subFields: [
              {
                name: "description",
                type: "string",
                defaultValue: "Individual configuration"
              }
            ]
          },
          {
            name: "blocks",
            type: "uiBlocks",
            defaultValue: []
          }
        ]
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
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "svg"]
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
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation"
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
        name: "hideImage",
        type: "boolean"
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
    component: FeatureGrid,
    name: "FeatureGrid",
    canHaveChildren: true,
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
        name: "hideImage",
        type: "boolean"
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
          }
        ]
      }
    ]
  },
  {
    component: Popup,
    name: "Popup",
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
      { name: "ctaText", type: "string", defaultValue: "Click Me" }
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
      { name: "title", type: "string" },
      { name: "anchor", type: "string" }
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
  }
];

export const componentMetadata = customComponents.map(({ name, inputs }) => ({
  name,
  inputs
}));
