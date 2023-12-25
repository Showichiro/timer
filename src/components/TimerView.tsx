import { PrimitiveAtom, useAtomValue } from "jotai";
import { focusAtom } from "jotai-optics";
import { FC, useRef } from "react";
import { Timer } from "../hooks/useTimerList";
import { StopWatch } from "./StopWatch";
import { CountDownTimer } from "./CountDownTimer";

const TimerView: FC<{
  timerAtom: PrimitiveAtom<Timer>;
  onClickDelete: () => void;
  playClickSound: () => void;
  playTimeUpSound: () => void;
}> = ({ timerAtom, onClickDelete, playClickSound, playTimeUpSound }) => {
  const timerTypeAtomRef = useRef(
    focusAtom(timerAtom, (optic) => optic.prop("type")),
  );
  const timerType = useAtomValue(timerTypeAtomRef.current);
  const titleAtomRef = useRef(
    focusAtom(timerAtom, (optic) => optic.prop("title")),
  );
  return timerType === "stopwatch" ? (
    <StopWatch
      titleAtom={titleAtomRef.current}
      onClickDelete={onClickDelete}
      playClickSound={playClickSound}
    />
  ) : (
    <CountDownTimer
      timerAtom={timerAtom}
      onClickDelete={onClickDelete}
      playClickSound={playClickSound}
      playTimeUpSound={playTimeUpSound}
    />
  );
};

export default TimerView;
