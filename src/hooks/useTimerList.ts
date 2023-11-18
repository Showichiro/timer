import { useCallback, useEffect, useReducer } from "react";
import { TimerValue } from "../types/TimerValue";
import { isLocalStorageAvailable } from "../utils/localStorageUtil";
import { getTimerFromUrl } from "../utils/urlUtil";

export type TimerType = "countdown" | "stopwatch";

/**
 * The Timer type represents a timer object with an id, type, timer value, and title.
 * @property {string} id - A unique identifier for the timer.
 * @property {TimerType} type - The `type` property in the `Timer` type is of type `TimerType`.
 * @property {TimerValue | undefined} timerValue - The `timerValue` property is of type `TimerValue` or
 * `undefined`.
 * @property {string | undefined} title - The `title` property is a string that represents the title or
 * name of the timer.
 */
export type Timer = {
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

/**
 * The reducer function takes in a state and an action, and returns a new state based on the action
 * type.
 * @param {State} state - The `state` parameter represents the current state of the application. In
 * this case, it is an array of `Timer` objects.
 * @param {Action} action - The `action` parameter is an object that represents the action being
 * dispatched. It has a `type` property that indicates the type of action being performed, and an
 * `args` property that contains additional data related to the action.
 * @returns The reducer function is returning an array of Timer objects.
 */
export const reducer = (state: State, action: Action): Timer[] => {
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
/**
 * The `initializer` function returns an array of timers, including a timer obtained from the URL if
 * available, and timers retrieved from local storage.
 * @returns The function `initializer` returns an array of `Timer` objects.
 */
export const initializer = (): Timer[] => {
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

/**
 * The `useTimerList` function is a custom hook in TypeScript that manages a list of timers, allowing
 * users to add, remove, and update timers.
 * @returns The `useTimerList` function returns an object with the following properties:
 */
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
