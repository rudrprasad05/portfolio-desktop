"use client";

import React, { useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import AppIcon from "./AppIcon";
import MinimizedAppsMenu from "./MinimizedAppsMenu";

const MenuBar = () => {
  const { apps, openApp, openAppsStack, minimizedAppStack } = useAppContext();

  return (
    <nav className="absolute w-[100vw] bottom-4 ">
      <div className="max-w-[70vw] mx-auto rounded-3xl glass flex items-center px-3 pt-3 pb-2">
        <div className="grow flex gap-4 items-center">
          {apps.map((app) => (
            <AppIcon
              isOpen={app.isOpen}
              showName={false}
              key={app.id}
              name={app.name}
              icon={app.icon}
              onOpen={() => openApp(app.id)}
            />
          ))}
        </div>

        <MinimizedAppsMenu />
      </div>
    </nav>
  );
};

export default MenuBar;
