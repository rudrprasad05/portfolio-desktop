"use client";

import { AppIconProps } from "@/app/types";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { useAppContext } from "../context/AppContext";

const AppIcon: React.FC<AppIconProps> = ({
  id,
  name,
  icon,
  showName,
  isOpen,
}) => {
  const { state, openApp } = useAppContext();
  const { openAppsStack, minimizedAppStack } = state;

  return (
    <article
      onClick={() => openApp(id)}
      className="flex text-white items-center gap-2 h-min cursor-pointer  flex-col"
    >
      <div className="w-16 h-16 flex items-center justify-center">
        <Image
          className="w-full h-full object-cover"
          src={"/" + icon}
          alt={`${name} icon`}
          width={50}
          height={50}
        />
      </div>

      {!showName && (
        <div
          content=""
          className={clsx(
            "rounded-full w-1 h-1 bg-slate-50",
            isOpen ? "opacity-100" : "opacity-0"
          )}
        ></div>
      )}

      {showName && <p className="text-sm">{name}</p>}
    </article>
  );
};

export default AppIcon;
