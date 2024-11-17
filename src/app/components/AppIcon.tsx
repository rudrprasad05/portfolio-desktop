"use client";

import { AppIconProps } from "@/app/types";
import React from "react";

const AppIcon: React.FC<AppIconProps> = ({ name, icon, onOpen }) => (
  <article
    onClick={onOpen}
    className="flex text-white items-center gap-2  flex-col"
  >
    <img src={icon} alt={`${name} icon`} width={50} height={50} />
    <p className="text-xs">{name}</p>
  </article>
);

export default AppIcon;
