import { useCallback, useEffect, useReducer } from "react";
import { TimerValue } from "../types/TimerValue";
import { isLocalStorageAvailable } from "../utils/localStorageUtil";
import { getTimerFromUrl } from "../utils/urlUtil";

type Timer = {
  id: string;
  timerValue: TimerValue | undefined;
  title: string | undefined;
};

type State = Timer[];

type Action =
  | {
    type: "addNewTimer";
    args: { id: string };
  }
  | {
    type: "updateTimer";
    args: Timer;
  }
  | {
    type: "removeTimer";
    args: { id: string };
  };

const reducer = (state: State, action: Action): Timer[] => {
  switch (action.type) {
    case "addNewTimer": {
      const {
        args: { id },
      } = action;
      return [...state, { id, timerValue: undefined, title: undefined }];
    }
    case "updateTimer": {
      const { args: timer } = action;
      return state.map((element) =>
        element.id === timer.id ? timer : element,
      );
    }
    case "removeTimer": {
      const {
        args: { id },
      } = action;
      return state.filter(({ id: elementId }) => elementId !== id);
    }
    default:
      return state;
  }
};

const key = "timerList";

const defaultValue = [{ id: window.crypto.randomUUID(), timerValue: undefined, title: undefined }];

const initializer = (): Timer[] => {
  // URLからタイマーを取得する
  const urlValue = getTimerFromUrl();

  const savedList = localStorage.getItem(key);
  if (!savedList) {
    return defaultValue;
  }
  const parsed = JSON.parse(savedList) as Timer[];
  return urlValue
    ? [{ id: window.crypto.randomUUID(), timerValue: urlValue, title: undefined }, ...parsed]
    : parsed;
};

export const useTimerList = () => {
  const isAvailable = isLocalStorageAvailable();
  const [state, dispatch] = useReducer(
    reducer,
    [],
    isAvailable ? initializer : () => defaultValue,
  );

  useEffect(() => {
    if (isAvailable) {
      localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state]);

  const addNewTimer = useCallback(
    () => dispatch({ type: "addNewTimer", args: { id: window.crypto.randomUUID() } }),
    [],
  );
  const removeTimer = useCallback(
    (id: string) => dispatch({ type: "removeTimer", args: { id } }),
    [],
  );
  const updateTimer = useCallback(
    (timer: Timer) => dispatch({ type: "updateTimer", args: { ...timer } }),
    [],
  );
  return { timerList: state, addNewTimer, removeTimer, updateTimer };
};
