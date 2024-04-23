import type { PrimitiveAtom } from "jotai";
import type { FC } from "react";
import type { Timer } from "../hooks/useTimerList";
import useTimerValue from "../hooks/useTimerValue";
import { CardTitle } from "./CardTitle";
import { CardWapper } from "./CardWrapper";
import { CountDownCardBody } from "./CountDownCardBody";

type TimerProps = {
  timerAtom: PrimitiveAtom<Timer>;
  onClickDelete: () => void;
  playClickSound: () => void;
  playTimeUpSound: () => void;
};

export const CountDownTimer: FC<TimerProps> = ({
  timerAtom,
  onClickDelete,
  playClickSound,
  playTimeUpSound,
}) => {
  const {
    title,
    timerValue: {
      defaultTimerValue,
      currentValue,
      handleClickCount,
      handleClickEditCancel,
      handleClickEditConfirm,
      handleClickPause,
      handleClickReset,
      handleClickResume,
      handleClickStart,
      isEditing,
      isExpired,
      isResume,
      isRunning,
      isStarted,
    },
  } = useTimerValue({
    playClickSound,
    playTimeUpSound,
    timerAtom,
  });
  return (
    <CardWapper isExpired={isExpired}>
      <CardTitle titleAtom={title} onClick:deleteButton={onClickDelete} />
      <CountDownCardBody
        currentValues={currentValue}
        defaultValues={defaultTimerValue}
        disabled:pause={!isRunning}
        disabled:reset={!isStarted}
        disabled:resume={isRunning}
        disabled:start={isRunning}
        isEditing={isEditing}
        isExpired={isExpired}
        isVisible:resume={isResume}
        isVisible:start={!isResume}
        onClick:count={handleClickCount}
        onClick:editConfirm={handleClickEditConfirm}
        onClick:editCancel={handleClickEditCancel}
        onClick:pause={handleClickPause}
        onClick:reset={handleClickReset}
        onClick:resume={handleClickResume}
        onClick:start={handleClickStart}
      />
    </CardWapper>
  );
};
