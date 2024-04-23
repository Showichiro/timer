import { type PrimitiveAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { useAtomCallback } from "jotai/utils";
import { useCallback, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import type { TimerValue } from "../types/TimerValue";
import { convertTimerValueToTimeStamp } from "../utils/convertTimerValueToTimeStamp";
import type { Timer } from "./useTimerList";

type Args = {
  timerAtom: PrimitiveAtom<Timer>;
  playClickSound: () => void;
  playTimeUpSound: () => void;
};

const useTimerValue = ({
  playClickSound,
  playTimeUpSound,
  timerAtom,
}: Args) => {
  // title
  const titleAtomRef = useRef(
    focusAtom(timerAtom, (optic) => optic.prop("title")),
  );

  //   timerValue
  const timerValueAtomRef = useRef(
    focusAtom(timerAtom, (optic) => optic.prop("timerValue")),
  );

  const timerValue = useAtomValue(timerValueAtomRef.current);

  const changeTimerValue = useAtomCallback(
    useCallback((_get, set, timerValue: TimerValue) => {
      set(timerValueAtomRef.current, timerValue);
    }, []),
  );

  const defaultTimerValue = timerValue ?? { hours: 0, minutes: 6, seconds: 0 };

  const { hours, minutes, seconds, isRunning, pause, start, restart, resume } =
    useTimer({
      expiryTimestamp: convertTimerValueToTimeStamp(
        timerValue ?? { hours: 0, minutes: 6, seconds: 0 },
      ),
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
  }, [restart, playClickSound, defaultTimerValue]);

  const [isEditing, setIsEditing] = useState(false);

  const handleClickCount = useCallback(() => setIsEditing(true), []);

  const handleClickEditConfirm = useCallback(
    (timerValue: TimerValue) => {
      changeTimerValue(timerValue);
      restart(convertTimerValueToTimeStamp(timerValue), false);
      setIsEditing(false);
    },
    [restart, changeTimerValue],
  );

  const handleClickEditCancel = useCallback(() => setIsEditing(false), []);

  return {
    title: titleAtomRef.current,
    timerValue: {
      defaultTimerValue,
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
    },
  };
};
export default useTimerValue;
