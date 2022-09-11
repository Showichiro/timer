import { useCallback, useReducer } from "react";
import uuid from "react-uuid";
type State = string[];

type Action =
  | {
      type: "addNewId";
      args: { id: string };
    }
  | {
      type: "removeId";
      args: { id: string };
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "addNewId": {
      const {
        args: { id },
      } = action;
      return [...state, id];
    }
    case "removeId": {
      const {
        args: { id },
      } = action;
      return state.filter((element) => element !== id);
    }
    default:
      return state;
  }
};

export const useTimerIdList = () => {
  const [state, dispatch] = useReducer(reducer, [uuid()]);
  const addNewId = useCallback(
    () => dispatch({ type: "addNewId", args: { id: uuid() } }),
    []
  );
  const removeId = useCallback(
    (id: string) => dispatch({ type: "removeId", args: { id } }),
    []
  );
  return { idList: state, addNewId, removeId };
};
