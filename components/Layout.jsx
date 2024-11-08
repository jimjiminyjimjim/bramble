"use client";
import React from "react";

export const Context = React.createContext();

export default function Page({ children, siteData }) {

  return (
    <Context.Provider value={siteData}>
        {children}
    </Context.Provider>
  );
}
