import { useCallback, useEffect, useReducer } from "react";
import { TimerValue } from "../types/TimerValue";
import { isLocalStorageAvailable } from "../utils/localStorageUtil";
import { getTimerFromUrl } from "../utils/urlUtil";

export type TimerType = "countdown" | "stopwatch";

type Timer = {
  id: string;
  type: TimerType;
  timerValue: TimerValue | undefined;
  title: string | undefined;
};

type State = Timer[];

type Action =
  | {
      type: "addNewTimer";
      args: { id: string; type: TimerType };
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
        args: { id, type },
      } = action;
      return [...state, { id, timerValue: undefined, title: undefined, type }];
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

const defaultValue: Timer[] = [
  {
    id: window.crypto.randomUUID(),
    timerValue: undefined,
    title: undefined,
    type: "countdown",
  },
];

const initializer = (): Timer[] => {
  // URLからタイマーを取得する
  const urlValue = getTimerFromUrl();

  const savedList = localStorage.getItem(key);
  if (!savedList) {
    return defaultValue;
  }
  const parsed = JSON.parse(savedList) as Timer[];
  return urlValue
    ? [
        {
          id: window.crypto.randomUUID(),
          timerValue: urlValue,
          title: undefined,
          type: "countdown",
        },
        ...parsed,
      ]
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
    (type: TimerType) =>
      dispatch({
        type: "addNewTimer",
        args: { id: window.crypto.randomUUID(), type },
      }),
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
