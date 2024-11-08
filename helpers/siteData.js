"use client";

import { Context } from "@/components/Layout";
import { useContext } from "react";

export const useSiteData = () => {
  const context = useContext(Context);
  return context;
};
