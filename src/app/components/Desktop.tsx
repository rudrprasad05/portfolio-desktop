"use client";

import React, { useCallback, useState } from "react";
import AppIcon from "./AppIcon";
import AppWindow from "./AppWindow";
import { AppWindowProps, DRAGGABLE } from "../types";
import { useAppContext } from "../context/AppContext";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import MenuBar from "./MenuBar";
import TopMenuBar from "./TopMenuBar";
import AppWindowOverlay from "./AppWindowOverlay";
import { DoublyLinkedList } from "@/components/class/DoublyLinkedList";

const Desktop: React.FC = () => {
  const {
    apps,
    openAppsStack,
    openApp,
    updateAppPosition,
    handleWindowClick,
    setActiveDraggingId,
  } = useAppContext();
  const [activeApp, setActiveApp] = useState<{
    id: number;
    width: number;
    height: number;
  } | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));
  const [openApps, setOpenApps] = useState(() => openAppsStack);

  const handleDragStart = (event: any) => {
    const { id } = event.active;
    const app = apps.find((app) => app.id === id);
    if (app) {
      handleWindowClick(app.id);
      openApps.printForward();
      setActiveApp({ id: app.id, width: app.width, height: app.height }); // Store the app's dimensions
      setActiveDraggingId(app?.id);
    }
  };

  const handleDragEnd = (event: any) => {
    const { id } = event.active;
    const delta = event.delta;
    const app = apps.find((app) => app.id === id);
    if (app) {
      updateAppPosition(id, app.x + delta.x, app.y + delta.y);
      setActiveDraggingId(undefined);
    }
  };

  return (
    <main className="bg-cover bg-no-repeat h-[100vh] w-[100vw] bg-desktop">
      <TopMenuBar />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-12 p-8 grid-flow-row w-full h-full">
          {apps.map((app) => (
            <AppIcon
              isOpen={false}
              showName
              key={app.id}
              name={app.name}
              icon={app.icon}
              onOpen={() => openApp(app.id)}
            />
          ))}

          {openAppsStack.getAllForward().map((app, index) => {
            return <AppWindow key={index} {...app} />;
          })}
          <DragOverlay adjustScale style={{ transformOrigin: "0 0" }}>
            {activeApp ? (
              <AppWindowOverlay
                {...apps.find((app) => app.id === activeApp.id)!}
              />
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
      <MenuBar />
    </main>
  );
};

export default Desktop;
