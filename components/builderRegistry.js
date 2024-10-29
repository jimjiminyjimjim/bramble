"use client";

import { PricingBlocks } from "@/components/PricingBlocks";
import { register } from "@builder.io/sdk-react";
import { HeroImage } from "@/components/HeroImage";
import { Hero } from "@/components/Hero";
import { Feature } from "@/components/Feature";
import { Organize } from "@/components/Organize";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { MinFooter } from "@/components/MinFooter";

import { Works } from "@/components/Works";
import { Testimonial } from "@/components/Testimonial";
import { Download } from "@/components/Download";
import { SignUp } from "@/components/SignUp";
import { Popup } from "@/components/Popup";
import { TextBlock } from "@/components/TextBlock";

register("editor.settings", {
  styleStrictMode: true, // optional
  designTokens: {
    colors: [
      { name: "Brand Red", value: "var(--red, #ff0000)" },
      { name: "Brand Blue", value: "rgba(93, 150, 255, 1)" },
    ],
    spacing: [
      { name: "Large", value: "var(--space-large, 20px)" },
      { name: "Small", value: "var(--space-small, 10px)" },
      { name: "Tiny", value: "5px" },
    ],
    fontFamily: [
      { name: "Serif Font", value: "var(--serif-font, Times, serif)" },
      { name: "Primary Font", value: "Roboto, sans-serif" },
    ],
  },
});

// this array can contain as many custom components as you want
export const customComponents = [
  {
    component: PricingBlocks,
    name: "Pricing Blocks",
    inputs: [
      { name: "anchor", type: "string" },
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
        ],
      },
    ],
  },
  {
    component: Hero,
    name: "Hero",
    inputs: [
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
        name: "downloads",
        type: "string",
        defaultValue: "14M+",
      },
      {
        name: "growth",
        type: "string",
        defaultValue: "128.5%",
      },
      {
        name: "userBase",
        type: "string",
        defaultValue: "2.8M+",
      },
      {
        name: "reviews",
        type: "string",
        defaultValue: "2,800+",
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
        name: "image",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        required: true,
        defaultValue:
          "https://cdn.builder.io/api/v1/image/assets%2Fpwgjf0RoYWbdnJSbpBAjXNRMe9F2%2Ffb27a7c790324294af8be1c35fe30f4d",
      },
    ],
  },
  {
    component: TextBlock,
    name: "TextBlock",
    canHaveChildren: true,
    inputs: [
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
      }
    ],
  },
  {
    component: SignUp,
    name: "SignUp",
    inputs: [
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
    component: Organize,
    name: "Organize",
    inputs: [
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
            defaultValue: "AiOutlineCheckCircle"
          },
        ],
      }
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
      { name: "mailchimpForm", type: "boolean" },
      { name: "formCode", type: "code" },
      { name: "ctaText", type: "string" },
    ],
  },
  {
    component: FAQ,
    name: "FAQ",
    inputs: [
      { name: "title", type: "string" },
      { name: "anchor", type: "string" },
    ],
  },
  {
    component: Footer,
    name: "Footer",
    inputs: [
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: MinFooter,
    name: "MinFooter",
    inputs: [
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: Works,
    name: "Works",
    inputs: [
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: Testimonial,
    name: "Testimonial",
    inputs: [
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
  {
    component: Download,
    name: "Download",
    inputs: [
      { name: "anchor", type: "string" },
      { name: "title", type: "string" },
    ],
  },
];
