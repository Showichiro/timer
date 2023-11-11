import { useTimer } from "react-timer-hook";
import { convertTimerValueToTimeStamp } from "../utils/convertTimerValueToTimeStamp";
import { TimerValue } from "../types/TimerValue";
import { useCallback, useState } from "react";
import { useTimeUpSound } from "./useTimeUpSound";
import { useClickSound } from "./useClickSound";

type Args = {
  defaultTimerValue?: TimerValue;
  handleEditTimerValue: (value: TimerValue) => void;
};

export const useTimerValue = ({
  defaultTimerValue = {
    hours: 0,
    minutes: 6,
    seconds: 0,
  },
  handleEditTimerValue,
}: Args) => {
  const { playTimeUpSound } = useTimeUpSound();
  const { playClickSound } = useClickSound();
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
