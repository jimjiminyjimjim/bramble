"use client";

// Safe defaults when no theme context is available
const defaultColors = {
  primary: "transparent",
  secondary: "transparent",
  bold: "#000000",
  dark: "#000000",
  background: "transparent",
  text: {
    title: "#000000",
    body: "#333333"
  },
  button: {
    dark: "#000000",
    light: "#000000",
    text: "black"
  }
};

export const useTheme = (theme) => {
  // Return safe defaults - context is no longer used
  return defaultColors;
};
