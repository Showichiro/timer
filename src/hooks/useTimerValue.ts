import { useTimer } from "react-timer-hook";
import useSound from "use-sound";
import timeUpSound from "../assets/timeUpSound.mp3";
import clickSound from "../assets/clickSound.mp3";
import { convertTimerValueToTimeStamp } from "../utils/convertTimerValueToTimeStamp";
import { TimerValue } from "../types/TimerValue";
import { useCallback, useState } from "react";

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
  const [playTimeUpSound] = useSound(timeUpSound);
  const [playClickSound] = useSound(clickSound);
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
