import { Flow } from "./flows.types";

export const LOAD_FLOW = "LOAD_FLOW";
export const CREATE_NEW_FLOW = "CREATE_NEW_FLOW";
export const UPDATE_FLOW = "UPDATE_FLOW";
export const DUPLICATE_FLOW = "DUPLICATE_FLOW";
export const DELETE_FLOW = "DELETE_FLOW";
export const UPDATE_NODE = "UPDATE_NODE";
export const DELETE_NODE = "DELETE_NODE";
export const RERENDER = "RERENDER";

export const initialFlow: Flow = {
  selected: {},
  hovered: {},
  scale: 1,
  nodes: {
    gateway: {
      id: "gateway",
      type: "input-output",
      label: "gateway",
      ports: {
        outPort: {
          id: "outPort",
          type: "output",
        },
      },
      properties: {},
      position: { x: 629, y: 72 },
    },
  },
  links: {},
  offset: { x: 0, y: 0 },
};
