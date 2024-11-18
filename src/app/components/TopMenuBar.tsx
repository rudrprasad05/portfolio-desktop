"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";

const TopMenuBar = () => {
  const { apps, setApps, updateAppPosition, focusApp } = useAppContext();
  return (
    <nav className="px-5  py-1 w-[100vw] bg-black text-slate-100">
      {focusApp?.name || "Desktop"}
    </nav>
  );
};

export default TopMenuBar;
