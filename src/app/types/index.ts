export interface AppWindowProps {
  id: string; // unique identifier
  name: string;
  icon: string | "default-application-icon.png";
  x: number; // x-coordinate for initial position
  y: number; // y-coordinate for initial position
  width: number;
  height: number;
  content: React.ReactNode;
}

export interface AppIconProps {
  name: string;
  icon: string; // URL or path to the icon image
  onOpen: () => void;
}

export const DRAGGABLE = {
  WINDOW: "WINDOW",
  ICON: "ICON",
};

export interface DragItem {
  id: string;
  type: string;
  left: number;
  top: number;
}

export interface AppContextProps {
  apps: AppWindowProps[];
  setApps: (a: any) => void;
  openApps: { [key: string]: boolean };
  toggleApp: (id: string) => void;
  isOpen: (id: string) => boolean;
  fullscreen: (id: string) => void;
  minSize: (id: string) => void;
  openApp: (id: string) => void;
  closeApp: (id: string) => void;
  isAppOpen: (id: string) => boolean;
  getAppInfo: (id: string) => AppWindowProps | undefined;
}
