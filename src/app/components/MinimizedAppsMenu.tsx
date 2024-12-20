"use client";

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import AppIcon from "./AppIcon";

export default function MinimizedAppsMenu() {
  const { apps, openApp, handleUnMinimize, state } = useAppContext();
  const { openAppsStack, minimizedAppStack } = state;

  const [minAppStack, setminAppStack] = useState(
    minimizedAppStack.getAllForward()
  );

  useEffect(() => {
    setminAppStack(minimizedAppStack.getAllForward());
  }, [minimizedAppStack]);
  return (
    <div className="flex items-center gap-4">
      {minimizedAppStack.length > 0 && (
        <div
          className="w-[1px] h-12 rounded-sm bg-gray-600 ml-auto"
          content=""
        ></div>
      )}
      <div className="gap-4 flex items-center">
        {minimizedAppStack.getAllForward().length > 0 &&
          minimizedAppStack.getAllForward().map((app, index) => (
            <div key={index}>
              <AppIcon
                isOpen={app.isOpen}
                showName={false}
                key={index}
                name={app.name}
                icon={app.icon}
                id={app.id}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
