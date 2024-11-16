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
