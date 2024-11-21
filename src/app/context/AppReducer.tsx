import { DoublyLinkedList } from "@/components/class/DoublyLinkedList";
import { AppWindowProps } from "../types";

type Action =
  | { type: "OPEN_APP"; payload: AppWindowProps }
  | { type: "CLOSE_APP"; payload: AppWindowProps }
  | { type: "MINIMIZE_APP"; payload: AppWindowProps }
  | { type: "RESTORE_APP"; payload: AppWindowProps };

export type State = {
  openAppsStack: DoublyLinkedList<AppWindowProps>;
  minimizedAppStack: DoublyLinkedList<AppWindowProps>;
};

export type Dispatch = React.Dispatch<Action>;

export default function appReducer(
  state: {
    openAppsStack: DoublyLinkedList<AppWindowProps>;
    minimizedAppStack: DoublyLinkedList<AppWindowProps>;
  },
  action: Action
): {
  openAppsStack: DoublyLinkedList<AppWindowProps>;
  minimizedAppStack: DoublyLinkedList<AppWindowProps>;
} {
  switch (action.type) {
    case "OPEN_APP":
      state.openAppsStack.append(action.payload); // Add to open apps stack
      return { ...state };

    case "CLOSE_APP":
      state.openAppsStack.remove(action.payload); // Remove from open apps stack
      return { ...state };

    case "MINIMIZE_APP":
      state.openAppsStack.remove(action.payload); // Remove from open apps stack
      state.minimizedAppStack.append(action.payload); // append to minimized stack
      return { ...state };

    case "RESTORE_APP":
      state.minimizedAppStack.remove(action.payload); // Remove from minimized stack
      state.openAppsStack.append(action.payload); // Add back to open stack
      return { ...state };

    default:
      return state; // Default case to avoid runtime errors
  }
}