"use client";

import React, { useCallback, useRef, useState } from "react";
import { AppWindowProps, DRAGGABLE, DragItem } from "../types";
import { useAppContext } from "../context/AppContext";
import { Maximize2, Minus, X } from "lucide-react";
import update from "immutability-helper";
import { useDraggable } from "@dnd-kit/core";

type ResizeAction = "HORIZONTAL" | "VERTICAL";

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
    dispatch,
    handleMinimize,
    getAppInfo,
    handleWindowClick,
    minSize,
    activeDraggingId,
  } = useAppContext();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const [isFullScreen, setisFullScreen] = useState(false);
  const [action, setAction] = useState<ResizeAction>("HORIZONTAL");
  let thisApp = getAppInfo(id);

  if (!thisApp) return;

  const [size, setSize] = useState<{
    width: number;
    height: number;
  }>({ width: thisApp?.width, height: thisApp?.height });
  const [mouseStart, setMouseStart] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [resizeStart, setResizeStart] = useState<{
    width: number;
    height: number;
  }>({ width: thisApp?.width, height: thisApp?.height });

  const handleResizeMouseDown = (
    event: React.MouseEvent,
    action: ResizeAction
  ) => {
    setAction(action);
    setMouseStart({ x: event.clientX, y: event.clientY });
    setResizeStart({ width, height });

    // Add mousemove and mouseup listeners to track dragging
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e: MouseEvent) => {
    console.log("MouseMove");

    const deltaX = action == "HORIZONTAL" ? e.clientX - mouseStart.x : 0; // Horizontal mouse movement
    const deltaY = action == "VERTICAL" ? e.clientY - mouseStart.y : 0; // Vertical mouse movement

    console.log(deltaX, deltaY);

    // Update size based on mouse movement
    setSize({
      width: resizeStart.width + deltaX,
      height: resizeStart.height + deltaY,
    });
    thisApp.height = resizeStart.height + deltaY;
    thisApp.width = resizeStart.width + deltaX;
  };

  const handleResizeMouseUp = () => {
    window.removeEventListener("mousemove", handleResizeMouseMove);
    window.removeEventListener("mouseup", handleResizeMouseUp);
  };

  const handleFullScreen = () => {
    if (!isFullScreen) {
      setisFullScreen(true);
      fullscreen(id);
      dispatch({ type: "MAXIMIZE_APP", payload: thisApp });
      setSize({ width: window.innerWidth, height: window.innerHeight });
    } else {
      setisFullScreen(false);
      dispatch({ type: "SMALLEN_APP", payload: thisApp });
      setSize({ width: 300, height: 400 });
      minSize(id);
    }
  };

  return thisApp.isOpen ? (
    <main
      onClick={() => handleWindowClick(thisApp?.id)}
      className="resize absolute transition border bg-appBg border-appBorder text-slate-200 rounded-xl s p-[1px]hadow-sm "
      style={{
        top: y,
        left: x,
        width: size.width,
        height: size.height,
        opacity: activeDraggingId === id ? "0" : "1",
      }}
    >
      <nav className="flex gap-4 items-center  bg-appMenuBg rounded-t-xl">
        <div className="group flex items-center gap-2 py-3 pl-5">
          <button
            onClick={() => closeApp(id)}
            className="rounded-full p-[1px] w-3 h-3 bg-destructive hover:none"
          >
            <X className="transition w-full h-full opacity-0 group-hover:opacity-100 text-appMenuBg" />
          </button>
          <button
            onClick={(e) => handleMinimize(e, id)}
            className="rounded-full p-[1px] w-3 h-3 bg-yellow-500"
          >
            <Minus className="transition w-full h-full opacity-0 group-hover:opacity-100 text-appMenuBg" />
          </button>

          <button
            onClick={() => handleFullScreen()}
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

// app resize

// {
//   {/* top */}
//   <div
//   style={{ width, height: "8px", top: "-5px" }}
//   className="absolute bg-red-600 opacity-0 cursor-ns-resize"
//   content=""
// ></div>
// {/* bottom */}
// <div
//   style={{ width, height: "8px", bottom: "-5px" }}
//   className="absolute bg-red-600 opacity-0 cursor-ns-resize"
//   content=""
//   onMouseDown={(e) => handleResizeMouseDown(e, "VERTICAL")}
// ></div>
// {/* left */}
// <div
//   style={{ height, width: "8px", left: "-5px" }}
//   className="absolute bg-red-600 opacity-0 cursor-ew-resize"
//   content=""
// ></div>
// {/* right */}
// <div
//   style={{ height, width: "8px", right: "-5px" }}
//   className="absolute bg-red-600 opacity-0 cursor-ew-resize"
//   content=""
//   onMouseDown={(e) => handleResizeMouseDown(e, "HORIZONTAL")}
// ></div>

// {/* top right */}
// <div
//   style={{
//     height: "8px",
//     width: "8px",
//     right: "-5px",
//     top: "-5px",
//     zIndex: 10,
//   }}
//   className="absolute bg-red-600 opacity-0 cursor-nesw-resize"
//   content=""
// ></div>
// {/* top left */}
// <div
//   style={{
//     height: "8px",
//     width: "8px",
//     left: "-5px",
//     top: "-5px",
//     zIndex: 10,
//   }}
//   className="absolute bg-red-600 opacity-0 cursor-nwse-resize"
//   content=""
// ></div>
// {/* bottom left */}
// <div
//   style={{
//     height: "8px",
//     width: "8px",
//     left: "-5px",
//     bottom: "-5px",
//     zIndex: 10,
//   }}
//   className="absolute bg-red-600 opacity-0 cursor-nesw-resize"
//   content=""
// ></div>
// {/* bottom right */}
// <div
//   style={{
//     height: "8px",
//     width: "8px",
//     right: "-5px",
//     bottom: "-5px",
//     zIndex: 10,
//   }}
//   className="absolute bg-red-600 opacity-0 cursor-nwse-resize"
//   content=""
// ></div>

// }
