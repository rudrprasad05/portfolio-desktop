"use client";

import React, { createContext, useContext, useState } from "react";
import { AppContextProps, AppWindowProps } from "../types";
import Stack from "@/app/types/Stack";

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const openAppsStack = new Stack<AppWindowProps>();
  const [activeDraggingId, setActiveDraggingId] = useState<number | undefined>(
    undefined
  );
  const [apps, setApps] = useState<AppWindowProps[]>([
    {
      id: 1,
      name: "Calculator",
      x: 100,
      y: 100,
      icon: "default-application-icon.png",
      width: 300,
      height: 400,
      content: <p>Calculator Content</p>,
      isOpen: false,
    },
    {
      id: 2,
      name: "Notes",
      x: 200,
      y: 150,
      icon: "default-application-icon.png",
      width: 400,
      height: 300,
      content: <p>Notes Content</p>,
      isOpen: false,
    },
  ]);

  const [focusApp, setFocusApp] = useState<AppWindowProps | null>(null);

  const [openApps, setOpenApps] = useState<{ [key: string]: boolean }>({
    "1": false,
    "2": false,
  });

  const handleWindowClick = (id: number) => {
    console.log("first");
    setFocusApp(getAppInfo(id) || null);
  };

  const toggleApp = (id: number) => {
    apps.map((app) => (app.id === id ? (app.isOpen = !app.isOpen) : app));

    let cApp: AppWindowProps | undefined = apps.find(
      (app) => app.id === id && app.isOpen
    );
    if (!cApp) setFocusApp(null);
    else setFocusApp(cApp);
    setOpenApps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isOpen = (id: number) => {
    let isOpen = false;
    apps.map((a) => (isOpen = a.id === id));
    return isOpen;
  };

  const openApp = (id: number) => {
    setOpenApps((prev) => ({ ...prev, [id]: true }));
  };

  const closeApp = (id: number) => {
    setOpenApps((prev) => ({ ...prev, [id]: false }));
  };

  const isAppOpen = (id: number): boolean => {
    return openApps[id] || false; // Returns true if app is open, false otherwise
  };

  const fullscreen = (id: number) => {
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

  const minSize = (id: number) => {
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

  const getAppInfo = (id: number): AppWindowProps | undefined => {
    return apps.find((app) => app.id === id);
  };

  const setAppInfo = (app: Partial<AppWindowProps>) => {
    if (!app.id) return;
    let app2 = getAppInfo(app?.id);
  };

  const updateAppPosition = (id: number, x: number, y: number) => {
    setApps((prevApps) =>
      prevApps.map((app) => (app.id === id ? { ...app, x, y } : app))
    );
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        setApps,
        updateAppPosition,
        openApps,
        toggleApp,
        isOpen,
        fullscreen,
        isAppOpen,
        openApp,
        closeApp,
        focusApp,
        handleWindowClick,
        getAppInfo,
        minSize,
        activeDraggingId,
        setActiveDraggingId,
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
