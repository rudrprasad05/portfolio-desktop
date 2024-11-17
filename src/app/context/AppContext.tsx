"use client";

import React, { createContext, useContext, useState } from "react";
import { AppContextProps, AppWindowProps } from "../types";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const isOpen = (id: string) => {
    let isOpen = false;
    apps.map((a) => (isOpen = a.id === id));
    return isOpen;
  };

  const openApp = (id: string) => {
    setOpenApps((prev) => ({ ...prev, [id]: true }));
  };

  const closeApp = (id: string) => {
    setOpenApps((prev) => ({ ...prev, [id]: false }));
  };

  const isAppOpen = (id: string): boolean => {
    return openApps[id] || false; // Returns true if app is open, false otherwise
  };

  const fullscreen = (id: string) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id
          ? {
              ...app,
              x: 0,
              y: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            }
          : app
      )
    );
  };

  const minSize = (id: string) => {
    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === id
          ? {
              ...app,
              x: 0,
              y: 0,
              width: 400,
              height: 300,
            }
          : app
      )
    );
  };

  const getAppInfo = (id: string): AppWindowProps | undefined => {
    return apps.find((app) => app.id === id);
  };

  const setAppInfo = (app: Partial<AppWindowProps>) => {
    if (!app.id) return;
    let app2 = getAppInfo(app?.id);
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        setApps,
        openApps,
        toggleApp,
        isOpen,
        fullscreen,
        isAppOpen,
        openApp,
        closeApp,
        getAppInfo,
        minSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
