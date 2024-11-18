"use client";

import React, { CSSProperties, useCallback, useRef, useState } from "react";
import { AppWindowProps, DRAGGABLE, DragItem } from "../types";
import { useAppContext } from "../context/AppContext";
import { Maximize2, Minus, X } from "lucide-react";
import update from "immutability-helper";
import { useDraggable } from "@dnd-kit/core";

const AppWindowOverlay: React.FC<AppWindowProps> = ({
  id,
  name,
  x,
  y,
  width,
  height,
  content,
}) => {
  const {
    toggleApp,
    fullscreen,
    isAppOpen,
    getAppInfo,
    handleWindowClick,
    minSize,
  } = useAppContext();

  let isOpen = isAppOpen(id);

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [isFullScreen, setisFullScreen] = useState(false);
  let thisApp = getAppInfo(id);

  if (!thisApp) return;

  const inlineStyles: CSSProperties = {
    transformOrigin: "50% 50%",
    width,
    height,
  };

  return isOpen ? (
    <main
      style={inlineStyles}
      onClick={() => handleWindowClick(thisApp?.id)}
      className="absolute transition border bg-appBg border-appBorder text-slate-200 rounded-xl s p-[1px] shadow-sm overflow-auto"
    >
      <nav className="flex gap-4 items-center  bg-appMenuBg">
        <div className="group flex items-center gap-2 py-3 pl-5">
          <button className="rounded-full p-[1px] w-3 h-3 bg-destructive hover:none">
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

export default AppWindowOverlay;
