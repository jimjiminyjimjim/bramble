"use client";

import { PricingBlocks } from "@/components/PricingBlocks";
import { register } from "@builder.io/sdk-react";
import { HeroImage } from "@/components/HeroImage";
import { Hero } from "@/components/Hero";
import { Stats } from "@/components/Stats";
import { Feature } from "@/components/Feature";
import { AppFeatures } from "@/components/AppFeatures";
import { Screenshots } from "@/components/Screenshots";

import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MinFooter } from "@/components/MinFooter";

import { Works } from "@/components/Works";
import { Testimonial } from "@/components/Testimonial";
import { Download } from "@/components/Download";
import { SignUp } from "@/components/SignUp";
import { Popup } from "@/components/Popup";
import { TextBlock } from "@/components/TextBlock";
import { Topbar } from "@/components/Topbar";
import { Carousel } from "@/components/CustomTabs";

import { TandCs } from "@/components/TandCs";

// this array can contain as many custom components as you want
export const customComponents = [
  {
    component: Carousel,
    name: 'Carousel',
    /** To accept children in your custom component and by default it is false */
    canHaveChildren: true,
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true,
    },
    inputs: [
      {
        name: 'slides',
        type: 'list',
        subFields: [
        ],
        defaultValue: [
          {
            '@type': '@builder.io/sdk:Element',
            component: {
              name: 'Text',
              options: {
                text: 'Carousel Text - Im editable'
              }
            },
          }],
      },
    ],
  },
  {
    component: Topbar,
    name: "Topbar",
    canHaveChildren: true,
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
    ],
  },
  {
    name: "Pricing Blocks",
    component: PricingBlocks,
    canHaveChildren: true,
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true,
    },
    inputs: [
      { name: "anchor", type: "string" },
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "title", type: "string" },
      { name: "description", type: "string" },
      {
        name: "blocks",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Starter",
          },
          {
            name: "price",
            type: "string",
            defaultValue: "$29",
          },
          {
            name: "period",
            type: "string",
          },
          {
            name: "description",
            type: "string",
            defaultValue: "Best option for personal use",
          },
          {
            name: "features",
            type: "list",
            subFields: [
              {
                name: "description",
                type: "string",
                defaultValue: "Individual configuration",
              },
            ],
          },
          {
            name: "children",
            type: "uiBlocks",
            hideFromUI: true,
            defaultValue: [
              {
                "@type": "@builder.io/sdk:Element",
                component: {
                  name: "Text",

                  options: {
                    text: "This is editable block within the builder editor",
                  },
                },
                // responsiveStyles: {
                //   large: {
                //     ...,
                //   },
                //   small: {
                //     ...,
                //   },
                // },
              },
            ],
          },
          // {
          //   name: "button",
          //   type: "boolean",
          // },
          // {
          //   name: "buttonText",
          //   type: "text",
          //   showIf: function (options) {
          //     return options.get("button") === true;
          //   },
          // },
          // {
          //   name: "mailchimp",
          //   type: "boolean",
          //   showIf: function (options) {
          //     return options.get("button") === true;
          //   },
          // },
          // {
          //   name: "formCode", type: "code",
          //   showIf: function (options) {
          //     return options.get("mailchimp") === true;
          //   }
          // },
          // {
          //   name: "href",
          //   type: "string",
          //   showIf: function (options) {
          //     return (
          //       options.get("button") === true &&
          //       !options.get("mailchimp") === false
          //     );
          //   },
          // },
        ],
      },
    ],
  },
  {
    component: Hero,
    name: "Hero",
    canHaveChildren: true,
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand",
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand",
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      },
      {
        name: "downloads",
        type: "enum",
        enum: ["Show App Store", "Don't Show App Store"],
      },
    ],
  },
  {
    component: HeroImage,
    name: "HeroImage",
    canHaveChildren: true,
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true,
    },
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      { name: "alignment", type: "enum", enum: ["left", "center", "right"] },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand",
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        defaultValue:
          "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
      },
    ],
  },
  {
    component: TextBlock,
    name: "TextBlock",
    canHaveChildren: true,
    shouldReceiveBuilderProps: {
      builderBlock: true,
    },
    inputs: [
      {
        name: "columnTest",
        type: "list",
        subFields: [
          {
            name: "children",
            type: "uiBlocks",
          },
        ],
      },
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation",
      },

      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation",
      },
      {
        name: "body",
        type: "richText",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand",
      },
    ],
  },
  {
    component: SignUp,
    name: "SignUp",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      {
        name: "title",
        type: "string",
        defaultValue:
          "daisyAi - Advancing You Towards Efficiency, Convenience, and Innovation",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "Empower Your Mobile Journey with WrapAi, the Next-Generation App that Puts the Power of Performance Right in the Palm of Your Hand",
      },
      {
        name: "maichimpUrl",
        type: "string",
      },
    ],
  },
  {
    component: Screenshots,
    name: "Screenshots",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      {
        name: "heading",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity",
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app.",
      },
      {
        name: "screens",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing",
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time.",
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          },
        ],
      },
    ],
  },
  {
    component: AppFeatures,
    name: "AppFeatures",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      {
        name: "heading",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity",
      },
      {
        name: "description",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app.",
      },
      {
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
      },
      {
        name: "hideImage",
        type: "boolean",
      },
      {
        name: "features",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing",
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time.",
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle",
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          },
        ],
      },
    ],
  },
  {
    component: Stats,
    name: "Stats",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      {
        name: "title",
        type: "string",
        defaultValue: "Organize your tasks. Set priorities. Boost Productivity",
      },
      {
        name: "subtitle",
        type: "string",
        defaultValue:
          "This organized feature list provides a clear overview of the AI landing page's capabilities, making it easier for users to understand the key functionalities of the app.",
      },
      {
        name: "stats",
        type: "list",
        subFields: [
          {
            name: "title",
            type: "string",
            defaultValue: "Real-time Data Processing",
          },
          {
            name: "description",
            type: "string",
            defaultValue:
              "Swift processing of data for instant insights and responses. Ensure up-to-date information and analysis in real-time.",
          },
          {
            name: "image",
            type: "file",
            allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
          },
          {
            name: "icon",
            type: "string",
            defaultValue: "AiOutlineCheckCircle",
          },
        ],
      },
    ],
  },
  {
    component: Popup,
    name: "Popup",
    canHaveChildren: true,
    /** To receieve Builder props inside your custom component: by default false  */
    shouldReceiveBuilderProps: {
      /** To access builder's Blocks relative to your parent */
      builderBlock: true,
    },
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "mailchimpForm", type: "boolean" },
      { name: "formCode", type: "code" },
      { name: "ctaText", type: "string", defaultValue: "Click Me" },
    ],
  },
  {
    component: TandCs,
    name: "TandCs",
    canHaveChildren: true,
    inputs: [
      { name: "ctaText", type: "string" },
    ],
  },
  {
    component: FAQ,
    name: "FAQ",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "title", type: "string" },
      { name: "anchor", type: "string" },
    ],
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
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: MinFooter,
    name: "MinFooter",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: Works,
    name: "Works",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: Testimonial,
    name: "Testimonial",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: Download,
    name: "Download",
    inputs: [
      {
        name: "theme",
        type: "enum",
        enum: ["light", "dark", "white"],
        defaultValue: "light",
      },
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
];
