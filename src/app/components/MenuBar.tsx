"use client";

import React from "react";
import { useAppContext } from "../context/AppContext";
import AppIcon from "./AppIcon";

const MenuBar = () => {
  const { apps, toggleApp, setApps, updateAppPosition, minimizedAppStack } =
    useAppContext();
  return (
    <nav className="absolute w-[100vw] bottom-4 ">
      <div className="max-w-[70vw] mx-auto rounded-3xl glass flex gap-4 items-center px-3 pt-3 pb-2">
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
        {minimizedAppStack.length > 0 && (
          <div
            className="w-[1px] h-12 rounded-sm bg-gray-600 ml-auto"
            content=""
          ></div>
        )}

        {minimizedAppStack.length > 0 &&
          minimizedAppStack
            .getAllForward()
            .map((app) => (
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
