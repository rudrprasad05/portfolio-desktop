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

const Desktop: React.FC = () => {
  const { apps, openApps, toggleApp, setApps, updateAppPosition } =
    useAppContext();
  const [activeApp, setActiveApp] = useState<{
    id: number;
    width: number;
    height: number;
  } | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event: any) => {
    const { id } = event.active;
    const app = apps.find((app) => app.id === id);
    if (app) {
      setActiveApp({ id: app.id, width: app.width, height: app.height }); // Store the app's dimensions
    }
  };

  const handleDragEnd = (event: any) => {
    const { id } = event.active;
    const delta = event.delta;
    const app = apps.find((app) => app.id === id);
    if (app) {
      updateAppPosition(id, app.x + delta.x, app.y + delta.y);
    }
  };

  return (
    <main className="bg-cover bg-no-repeat h-[100vh] w-[100vw] bg-desktop">
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
              onOpen={() => toggleApp(app.id)}
            />
          ))}
          {apps.map(
            (app) => openApps[app.id] && <AppWindow key={app.id} {...app} />
          )}
          <DragOverlay>
            {activeApp ? (
              <AppWindow
                {...apps.find((app) => app.id === activeApp.id)!}
                isOverlay
                offsetX={-activeApp.width * 2}
                offsetY={-activeApp.height * 2}
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
