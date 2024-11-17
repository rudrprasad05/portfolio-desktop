"use client";

import React, { useCallback, useRef, useState } from "react";
import { AppWindowProps, DRAGGABLE, DragItem } from "../types";
import { useAppContext } from "../context/AppContext";
import { Maximize2, Minus, X } from "lucide-react";
import update from "immutability-helper";

const AppWindow: React.FC<AppWindowProps> = ({
  id,
  name,
  x,
  y,
  width,
  height,
  content,
}) => {
  const {
    setApps,
    apps,
    openApps,
    toggleApp,
    fullscreen,
    isAppOpen,
    getAppInfo,
  } = useAppContext();

  let isOpen = isAppOpen(id);

  return isOpen ? (
    <main
      role="DraggableBox"
      className="absolute transition border bg-appBg border-appBorder text-slate-200 rounded-xl s p-[1px]hadow-sm overflow-auto"
      style={{
        top: y,
        left: x,
        width,
        height,
      }}
    >
      <MenuBar id={id} />
      <div>{content}</div>
    </main>
  ) : null;
};

const MenuBar = ({ id }: { id: string }) => {
  const { minSize, fullscreen, closeApp, getAppInfo } = useAppContext();
  const [isFullScreen, setisFullScreen] = useState(false);
  let thisApp = getAppInfo(id);

  return (
    <nav className="flex gap-4 items-center py-3 px-5 bg-appMenuBg">
      <div className="group flex items-center gap-2">
        <button
          onClick={() => closeApp(id)}
          className="rounded-full p-[1px] w-3 h-3 bg-destructive hover:none"
        >
          <X className="transition w-full h-full opacity-0 group-hover:opacity-100 text-appMenuBg" />
        </button>
        <button className="rounded-full p-[1px] w-3 h-3 bg-yellow-500">
          <Minus className="transition w-full h-full opacity-0 group-hover:opacity-100 text-appMenuBg" />
        </button>

        <button
          onClick={() => {
            if (!isFullScreen) {
              setisFullScreen(true);
              fullscreen(id);
            } else {
              setisFullScreen(false);
              minSize(id);
            }
          }}
          className="rounded-full p-[1px] w-3 h-3 bg-green-500"
        >
          <Maximize2 className="transition w-full h-full opacity-0 group-hover:opacity-100 text-appMenuBg" />
        </button>
      </div>

      <span>{thisApp?.name}</span>
    </nav>
  );
};

export default AppWindow;
