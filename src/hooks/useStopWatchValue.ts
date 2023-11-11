import { useStopwatch } from "react-timer-hook";
import { useClickSound } from "./useClickSound";
import { useCallback } from "react";

export const useStopWatchValue = () => {
  const { playClickSound } = useClickSound();
  const {
    hours,
    minutes,
    seconds,
    start,
    isRunning,
    pause,
    reset,
    totalSeconds,
  } = useStopwatch({ autoStart: false });

  const handleClickStart = useCallback(() => {
    playClickSound();
    start();
  }, [start, playClickSound]);

  const handleClickPause = useCallback(() => {
    playClickSound();
    pause();
  }, [pause, playClickSound]);
  const isStarted = totalSeconds > 0;
  const isResume = !isRunning && isStarted;

  const handleClickReset = useCallback(() => {
    playClickSound();
    reset(new Date(), false);
  }, [playClickSound, reset]);

  return {
    hours,
    minutes,
    seconds,
    isRunning,
    isStarted,
    isResume,
    handleClickStart,
    handleClickPause,
    handleClickResume: handleClickStart,
    handleClickReset,
  };
};
