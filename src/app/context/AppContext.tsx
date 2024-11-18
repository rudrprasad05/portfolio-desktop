"use client";

import React, { createContext, useContext, useState } from "react";
import { AppContextProps, AppWindowProps } from "../types";
import Stack from "@/app/types/Stack";
import { DoublyLinkedList } from "@/components/class/DoublyLinkedList";

const AppContext = createContext<AppContextProps | undefined>(undefined);

const appsData = [
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
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openAppsStack, setOpenAppsStack] = useState(
    () => new DoublyLinkedList<AppWindowProps>()
  );
  const [minimizedAppStack, setMinimizedAppStack] = useState(
    () => new DoublyLinkedList<AppWindowProps>()
  );
  const [activeDraggingId, setActiveDraggingId] = useState<number | undefined>(
    undefined
  );
  const [apps, setApps] = useState<AppWindowProps[]>(appsData);
  const [focusApp, setFocusApp] = useState<AppWindowProps | null>(null);

  const handleWindowClick = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    const newStack = openAppsStack.toList(openAppsStack);
    handleWindowFocus(cApp, newStack);
  };

  const handleMinimize = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    let nApp: AppWindowProps | undefined = openAppsStack.tail?.prev?.data;
    const newStack = openAppsStack.toList(openAppsStack);
    handleWindowFocus(nApp, newStack);

    if (!cApp) return;

    openAppsStack.remove(cApp);
    minimizedAppStack.append(cApp);
  };

  const handleWindowFocus = (
    cApp: AppWindowProps | undefined,
    stack: DoublyLinkedList<AppWindowProps>
  ) => {
    if (cApp) {
      console.log("handleWindowFocus if");
      stack.remove(cApp);
      stack.append(cApp);

      setFocusApp(cApp || null);
    }
    console.log("handleWindowFocus");

    setOpenAppsStack(stack);
    apps.map((a) => console.log("handleWindowFocus", a));
  };

  const toggleApp = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    console.log(cApp);

    if (!cApp) {
      setFocusApp(null);
      return;
    }

    const newStack = openAppsStack.copyListWithoutOneNode(openAppsStack, cApp);

    // Toggle the app's open state
    if (cApp.isOpen) {
      console.log("Closing app:", cApp.name);
      setFocusApp(null);
      cApp.isOpen = false;
    } else {
      console.log("Opening app:", cApp.name);
      newStack.append(cApp);
      cApp.isOpen = true;
      setFocusApp(cApp);
    }

    // Update the openAppsStack state with the modified stack
    setOpenAppsStack(newStack);

    // Debug: Print the stack after toggling
    newStack.printBackward(); // Assuming printForward logs the current state of the stack
  };

  const isOpen = (id: number) => {
    let isOpen = false;
    apps.map((a) => (isOpen = a.id === id));
    return isOpen;
  };

  const openApp = (id: number) => {
    // setOpenApps((prev) => ({ ...prev, [id]: true }));
  };

  const closeApp = (id: number) => {
    // setOpenApps((prev) => ({ ...prev, [id]: false }));
  };

  const isAppOpen = (id: number): boolean => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) {
      return false;
    }
    let oApp = openAppsStack.find(cApp);
    if (!oApp) {
      return false;
    }
    return oApp?.data.isOpen;
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
    let cApp = getAppInfo(id);
    if (!cApp) return;
    cApp.x = x;
    cApp.y = y;
    handleWindowFocus(cApp, openAppsStack);
  };

  return (
    <AppContext.Provider
      value={{
        handleWindowFocus,
        apps,
        openAppsStack,
        minimizedAppStack,
        setApps,
        updateAppPosition,
        handleMinimize,
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
