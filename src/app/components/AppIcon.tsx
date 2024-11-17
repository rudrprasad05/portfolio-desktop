"use client";

import { AppIconProps } from "@/app/types";
import clsx from "clsx";
import React from "react";

const AppIcon: React.FC<AppIconProps> = ({
  name,
  icon,
  onOpen,
  showName,
  isOpen,
}) => (
  <article
    onClick={onOpen}
    className="flex text-white items-center gap-2  flex-col"
  >
    <img src={icon} alt={`${name} icon`} width={50} height={50} />

    <div
      content=""
      className={clsx(
        "rounded-full w-1 h-1 bg-slate-50",
        isOpen ? "opacity-100" : "opacity-0"
      )}
    ></div>

    {showName && <p className="text-xs">{name}</p>}
  </article>
);

export default AppIcon;
