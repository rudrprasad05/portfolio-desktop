"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import AppIcon from "./AppIcon";

const MenuBar = () => {
  const { apps, toggleApp, setApps, updateAppPosition } = useAppContext();
  return (
    <nav className="absolute w-[100vw] bottom-4 ">
      <div className="w-4/5 mx-auto rounded-3xl glass flex gap-4 items-center px-3 pt-3 pb-2">
        {apps.map((app) => (
          <AppIcon
            isOpen={app.isOpen}
            showName={false}
            key={app.id}
            name={app.name}
            icon={app.icon}
            onOpen={() => toggleApp(app.id)}
          />
        ))}
      </div>
    </nav>
  );
};

export default MenuBar;
