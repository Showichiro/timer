import type { PrimitiveAtom } from "jotai";
import type { FC } from "react";
import { useStopWatchValue } from "../hooks/useStopWatchValue";
import { CardTitle } from "./CardTitle";
import { CardWapper } from "./CardWrapper";
import { StopWatchCardBody } from "./StopWatchCardBody";

type StopWatchProps = {
  titleAtom: PrimitiveAtom<string>;
  onClickDelete: () => void;
  playClickSound: () => void;
};

export const StopWatch: FC<StopWatchProps> = ({
  titleAtom,
  onClickDelete,
  playClickSound,
}) => {
  const {
    isResume,
    isRunning,
    hours,
    handleClickPause,
    handleClickReset,
    handleClickResume,
    handleClickStart,
    isStarted,
    minutes,
    seconds,
  } = useStopWatchValue({ playClickSound });
  return (
    <CardWapper isExpired={false}>
      <CardTitle titleAtom={titleAtom} onClick:deleteButton={onClickDelete} />
      <StopWatchCardBody
        currentValues={{ hours, minutes, seconds }}
        disabled:pause={!isRunning}
        disabled:reset={!isStarted}
        disabled:resume={isRunning}
        disabled:start={isRunning}
        isVisible:resume={isResume}
        isVisible:start={!isResume}
        onClick:pause={handleClickPause}
        onClick:reset={handleClickReset}
        onClick:resume={handleClickResume}
        onClick:start={handleClickStart}
      />
    </CardWapper>
  );
};
