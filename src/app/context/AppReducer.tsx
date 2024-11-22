import { DoublyLinkedList } from "@/components/class/DoublyLinkedList";
import { AppWindowProps } from "../types";

type Action =
  | { type: "OPEN_APP"; payload: AppWindowProps }
  | { type: "CLOSE_APP"; payload: AppWindowProps }
  | { type: "MINIMIZE_APP"; payload: AppWindowProps }
  | { type: "RESTORE_APP"; payload: AppWindowProps }
  | { type: "FOCUS_APP"; payload: AppWindowProps }
  | { type: "RESIZE_APP"; payload: AppWindowProps }
  | { type: "SMALLEN_APP"; payload: AppWindowProps }
  | { type: "MAXIMIZE_APP"; payload: AppWindowProps };

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
  const { payload } = action;
  const handleOpen = () => {
    if (state.openAppsStack.find(payload)) return { ...state };

    payload.isOpen = true;
    state.openAppsStack.append(payload);

    if (state.minimizedAppStack.length > 0)
      state.minimizedAppStack.remove(payload);

    return { ...state };
  };

  let app = state.openAppsStack.find(payload);
  switch (action.type) {
    case "OPEN_APP":
      return handleOpen();

    case "CLOSE_APP":
      state.openAppsStack.remove(payload); // Remove from open apps stack
      return { ...state };

    case "MINIMIZE_APP":
      state.openAppsStack.remove(payload); // Remove from open apps stack
      state.minimizedAppStack.append(payload); // append to minimized stack
      return { ...state };

    case "RESTORE_APP":
      state.minimizedAppStack.remove(payload); // Remove from minimized stack
      state.openAppsStack.append(payload); // Add back to open stack
      return { ...state };
    case "FOCUS_APP":
      state.openAppsStack.remove(payload);
      state.openAppsStack.append(payload);
      return { ...state };
    case "MAXIMIZE_APP":
      if (!app) {
        return { ...state };
      }
      app.data.x = 0;
      app.data.y = 0;
      app.data.width = window.innerWidth;
      app.data.height = window.innerHeight;
      state.openAppsStack.remove(payload);
      state.openAppsStack.append(payload);
      return { ...state };

    case "SMALLEN_APP":
      if (!app) {
        return { ...state };
      }
      app.data.x = 200;
      app.data.y = 200;
      app.data.width = 300;
      app.data.height = 400;

      return { ...state };

    default:
      return state; // Default case to avoid runtime errors
  }
}
