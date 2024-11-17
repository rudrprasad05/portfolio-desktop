"use client";

import React, { useCallback, useState } from "react";
import AppIcon from "./AppIcon";
import AppWindow from "./AppWindow";
import { AppWindowProps, DRAGGABLE } from "../types";
import { useAppContext } from "../context/AppContext";

const Desktop: React.FC = () => {
  const { apps, openApps, toggleApp, setApps } = useAppContext();

  return (
    <main className="bg-cover bg-no-repeat h-[100vh] w-[100vw] bg-desktop">
      <div className="grid grid-cols-12 p-8 grid-flow-row w-full h-full">
        {apps.map((app) => (
          <AppIcon
            key={app.id}
            name={app.name}
            icon={app.icon}
            onOpen={() => toggleApp(app.id)}
          />
        ))}
        {apps.map(
          (app) => openApps[app.id] && <AppWindow key={app.id} {...app} />
        )}
      </div>
    </main>
  );
};

export default Desktop;
