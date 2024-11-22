"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { AppContextProps, AppWindowProps } from "../types";
import Stack from "@/app/types/Stack";
import { DoublyLinkedList } from "@/components/class/DoublyLinkedList";
import _ from "lodash";
import appReducer from "./AppReducer";

const AppContext = createContext<AppContextProps | undefined>(undefined);

const initialState = {
  openAppsStack: new DoublyLinkedList<AppWindowProps>(),
  minimizedAppStack: new DoublyLinkedList<AppWindowProps>(),
};

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

type ResizeAction = "HORIZONTAL" | "VERTICAL";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [activeDraggingId, setActiveDraggingId] = useState<number | undefined>(
    undefined
  );
  const [apps, setApps] = useState<AppWindowProps[]>(appsData);

  const handleWindowClick = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) return;

    dispatch({ type: "FOCUS_APP", payload: cApp });
  };

  const handleUnMinimize = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) return;

    dispatch({ type: "RESTORE_APP", payload: cApp });
  };

  const handleMinimize = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: number
  ) => {
    event.stopPropagation();
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) return;

    dispatch({ type: "MINIMIZE_APP", payload: cApp });
  };

  const openApp = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) {
      return;
    }

    dispatch({ type: "OPEN_APP", payload: cApp });
  };

  const closeApp = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);

    if (!cApp) {
      return;
    }
    dispatch({ type: "CLOSE_APP", payload: cApp });
  };

  const isOpen = (id: number) => {
    let isOpen = false;
    apps.map((a) => (isOpen = a.id === id));
    return isOpen;
  };

  const isAppOpen = (id: number): boolean => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) {
      return false;
    }
    let oApp = state.openAppsStack.find(cApp);
    if (!oApp) {
      return false;
    }
    return oApp.data.isOpen;
  };

  const fullscreen = (id: number) => {
    let cApp: AppWindowProps | undefined = getAppInfo(id);
    if (!cApp) {
      return false;
    }
    dispatch({ type: "MAXIMIZE_APP", payload: cApp });
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

    // let newStack = openAppsStack.toList();
    // handleWindowFocus(cApp, newStack);
  };

  return (
    <AppContext.Provider
      value={{
        apps,
        setApps,
        state,
        dispatch,
        updateAppPosition,
        handleMinimize,
        handleUnMinimize,
        isOpen,
        fullscreen,
        isAppOpen,
        openApp,
        closeApp,
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
