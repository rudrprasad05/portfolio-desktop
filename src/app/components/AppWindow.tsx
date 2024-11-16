"use client";

import React from "react";
import { AppWindowProps } from "../types";

const AppWindow: React.FC<AppWindowProps> = ({
  id,
  name,
  x,
  y,
  width,
  height,
  content,
}) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return isOpen ? (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width,
        height,
        border: "1px solid #000",
        backgroundColor: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        resize: "both",
        overflow: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px",
          backgroundColor: "#ddd",
        }}
      >
        <span>{name}</span>
        <button onClick={() => setIsOpen(false)} style={{ cursor: "pointer" }}>
          X
        </button>
      </div>
      <div>{content}</div>
    </div>
  ) : null;
};

export default AppWindow;
