import { useTimer } from "react-timer-hook";
import { convertTimerValueToTimeStamp } from "../utils/convertTimerValueToTimeStamp";
import { TimerValue } from "../types/TimerValue";
import { useCallback, useState } from "react";

/**
 * The `Args` type is a TypeScript type that represents an object with optional `defaultTimerValue`
 * property and a required `handleEditTimerValue` property, which is a function that takes a
 * `TimerValue` argument and returns `void`.
 * @property {TimerValue} defaultTimerValue - An optional property of type TimerValue that represents
 * the default value for a timer. If not provided, the timer will start with a default value.
 * @property handleEditTimerValue - A function that takes a value of type TimerValue as an argument and
 * does not return anything.
 */
type Args = {
  defaultTimerValue?: TimerValue;
  handleEditTimerValue: (value: TimerValue) => void;
  playClickSound: () => void;
  playTimeUpSound: () => void;
};

/**
 * The `useTimerValue` function is a custom hook in TypeScript that manages the state and functionality
 * of a timer, including starting, pausing, resetting, and editing the timer value.
 * @param {Args}  - - `defaultTimerValue`: An object that represents the default timer value, with
 * properties `hours`, `minutes`, and `seconds`.
 * @returns The function `useTimerValue` returns an object with the following properties:
 */
export const useTimerValue = ({
  defaultTimerValue = {
    hours: 0,
    minutes: 6,
    seconds: 0,
  },
  handleEditTimerValue,
  playClickSound,
  playTimeUpSound,
}: Args) => {
  const { hours, minutes, seconds, isRunning, pause, start, restart, resume } =
    useTimer({
      expiryTimestamp: convertTimerValueToTimeStamp(defaultTimerValue),
      autoStart: false,
      onExpire: () => {
        playTimeUpSound();
      },
    });

  const handleClickStart = useCallback(() => {
    playClickSound();
    start();
  }, [start, playClickSound]);

  const handleClickPause = useCallback(() => {
    playClickSound();
    pause();
  }, [playClickSound, pause]);

  const isExpired = !(hours > 0 || minutes > 0 || seconds > 0);
  const isStarted =
    convertTimerValueToTimeStamp(defaultTimerValue) >
    convertTimerValueToTimeStamp({ hours, minutes, seconds });
  const isResume = !isRunning && !isExpired && isStarted;

  const handleClickResume = useCallback(() => {
    playClickSound();
    resume();
  }, [playClickSound, resume]);

  const handleClickReset = useCallback(() => {
    playClickSound();
    restart(convertTimerValueToTimeStamp(defaultTimerValue), false);
  }, [restart, playClickSound]);

  const [isEditing, setIsEditing] = useState(false);

  const handleClickCount = useCallback(
    () => setIsEditing(true),
    [setIsEditing],
  );

  const handleClickEditConfirm = useCallback((timerValue: TimerValue) => {
    handleEditTimerValue(timerValue);
    restart(convertTimerValueToTimeStamp(timerValue), false);
    setIsEditing(false);
  }, []);

  const handleClickEditCancel = useCallback(
    () => setIsEditing(false),
    [setIsEditing],
  );

  return {
    isExpired,
    isStarted,
    isResume,
    isRunning,
    isEditing,
    currentValue: { hours, minutes, seconds },
    handleClickPause,
    handleClickReset,
    handleClickResume,
    handleClickStart,
    handleClickCount,
    handleClickEditConfirm,
    handleClickEditCancel,
  };
};
