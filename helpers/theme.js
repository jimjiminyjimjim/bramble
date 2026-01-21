"use client";

import { Context } from "@/components/Layout";
import { useContext } from "react";

export const useTheme = (theme) => {
  const context = useContext(Context);

  const themeColors = {
    light: {
      primary: context?.primaryTint,
      secondary: context?.secondaryTint,
      bold: context?.primaryColour,
      dark: context?.textColour,
      text: {
        title: context?.textColour,
        body: context?.textColour
      },
      button: {
        dark: context?.buttonColour || "#000000",
        light: context?.buttonColour || "#000000",
        text: "black"
      }
    },
    dark: {
      primary: context?.primaryColour,
      secondary: context?.secondaryColour,
      background: context?.primaryColour,
      text: {
        title: context?.textColour,
        body: context?.textColour
      },
      button: {
        dark: context?.buttonColour || "#000000",
        light: context?.buttonColour || "#000000",
        text: "white"
      }
    },
    white: {
      primary: context?.primaryColor,
      secondary: context?.secondaryColor,
      background: context?.primaryColour,
      text: {
        title: context?.primaryColour,
        body: "#333333"
      },
      button: {
        dark: context?.buttonColour || "#000000",
        light: context?.buttonColour || "#000000"
      }
    }
  };

  return themeColors[theme];
};
