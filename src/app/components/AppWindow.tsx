"use client";

import React, { useCallback, useRef, useState } from "react";
import { AppWindowProps, DRAGGABLE, DragItem } from "../types";
import { useAppContext } from "../context/AppContext";
import { Maximize2, Minus, X } from "lucide-react";
import update from "immutability-helper";
import { useDraggable } from "@dnd-kit/core";

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
    openApp,
    closeApp,
    fullscreen,
    isAppOpen,
    handleMinimize,
    getAppInfo,
    handleWindowClick,
    minSize,
    activeDraggingId,
  } = useAppContext();

  let isOpen = isAppOpen(id);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [isFullScreen, setisFullScreen] = useState(false);
  let thisApp = getAppInfo(id);

  if (!thisApp) return;

  return isOpen ? (
    <main
      onClick={() => handleWindowClick(thisApp?.id)}
      className="absolute transition border bg-appBg border-appBorder text-slate-200 rounded-xl s p-[1px]hadow-sm overflow-auto"
      style={{
        top: y,
        left: x,
        width,
        height,
        opacity: activeDraggingId === id ? "0" : "1",
      }}
    >
      <nav className="flex gap-4 items-center  bg-appMenuBg">
        <div className="group flex items-center gap-2 py-3 pl-5">
          <button
            onClick={() => closeApp(id)}
            className="rounded-full p-[1px] w-3 h-3 bg-destructive hover:none"
          >
            <X className="transition w-full h-full opacity-0 group-hover:opacity-100 text-appMenuBg" />
          </button>
          <button
            onClick={() => handleMinimize(id)}
            className="rounded-full p-[1px] w-3 h-3 bg-yellow-500"
          >
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
        <div
          ref={setNodeRef}
          {...attributes}
          {...listeners}
          className="grow pr-5 py-3"
        >
          <span>{thisApp?.name}</span>
        </div>
      </nav>
      <div>{content}</div>
    </main>
  ) : null;
};

export default AppWindow;
