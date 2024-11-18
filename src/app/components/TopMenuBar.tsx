"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import Image from "next/image";

const TopMenuBar = () => {
  const { apps, setApps, updateAppPosition, focusApp } = useAppContext();
  return (
    <nav className="px-5  py-1 w-[100vw] bg-black text-slate-100 flex gap-2">
      <div className="w-6 h-6">
        <Image
          className="object-cover w-full h-full"
          src={"/logo.jpg"}
          alt="LOGO"
          width={20}
          height={20}
        />
      </div>
      {focusApp?.name || "Desktop"}
    </nav>
  );
};

export default TopMenuBar;
