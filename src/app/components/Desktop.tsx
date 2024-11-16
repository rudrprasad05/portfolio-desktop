"use client";

import React, { useState } from "react";
import AppIcon from "./AppIcon";
import AppWindow from "./AppWindow";
import { AppWindowProps } from "../types";

const Desktop: React.FC = () => {
  const [apps, setApps] = useState<AppWindowProps[]>([
    {
      id: "1",
      name: "Calculator",
      x: 100,
      y: 100,
      icon: "default-application-icon.png",
      width: 300,
      height: 400,
      content: <p>Calculator Content</p>,
    },
    {
      id: "2",
      name: "Notes",
      x: 200,
      y: 150,
      icon: "default-application-icon.png",
      width: 400,
      height: 300,
      content: <p>Notes Content</p>,
    },
  ]);

  const [openApps, setOpenApps] = useState<{ [key: string]: boolean }>({
    "1": false,
    "2": false,
  });

  const toggleApp = (id: string) => {
    setOpenApps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <main className="bg-cover bg-no-repeat h-[100vh] w-[100vw] bg-desktop">
      <div className="grid grid-cols-12 p-8 grid-flow-col w-full h-full">
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
