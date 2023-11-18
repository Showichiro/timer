import { useStopwatch } from "react-timer-hook";
import { useClickSound } from "./useClickSound";
import { useCallback } from "react";

/**
 * The function `useStopWatchValue` returns an object with various properties and functions related to
 * a stopwatch, including the current hours, minutes, and seconds, whether the stopwatch is running or
 * not, and functions to start, pause, resume, and reset the stopwatch.
 * @returns The function `useStopWatchValue` returns an object with the following properties:
 */
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
