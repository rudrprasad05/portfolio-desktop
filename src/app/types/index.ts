import { DoublyLinkedList } from "@/components/class/DoublyLinkedList";

export interface AppWindowProps {
  id: number; // unique identifier
  name: string;
  icon: string | "default-application-icon.png";
  x: number; // x-coordinate for initial position
  y: number; // y-coordinate for initial position
  width: number;
  height: number;
  content: React.ReactNode;
  isOpen: boolean;
}

export interface AppIconProps {
  name: string;
  isOpen: boolean;
  icon: string; // URL or path to the icon image
  onOpen: () => void;
  showName: boolean;
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
  openAppsStack: DoublyLinkedList<AppWindowProps>;
  minimizedAppStack: DoublyLinkedList<AppWindowProps>;
  handleWindowClick: (id: number) => void;
  handleWindowFocus: (
    cApp: AppWindowProps | undefined,
    stack: DoublyLinkedList<AppWindowProps>
  ) => void;
  updateAppPosition: (id: number, x: number, y: number) => void;
  handleMinimize: (id: number) => void;
  setApps: (a: any) => void;
  toggleApp: (id: number) => void;
  isOpen: (id: number) => boolean;
  fullscreen: (id: number) => void;
  minSize: (id: number) => void;
  openApp: (id: number) => void;
  closeApp: (id: number) => void;
  isAppOpen: (id: number) => boolean;
  getAppInfo: (id: number) => AppWindowProps | undefined;
  activeDraggingId: number | undefined;
  setActiveDraggingId: (id: number | undefined) => void;
}
