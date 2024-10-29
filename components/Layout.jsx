"use client";
import { Topbar } from "@/components/Topbar";
import { Theme, useTheme } from "react-daisyui";

export default function Page({ children, siteData }) {
//   const theme = useTheme("pastel");
  
//   console.log("theme", theme);
  const { logo, primaryColor, secondaryColor } = siteData;

  console.log("siteData", siteData);
  return (
    <>
      <Theme dataTheme={"cupcake"}>
        <Topbar siteData={siteData}/>
        {children}
      </Theme>
    </>
  );
}
