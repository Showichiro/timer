import { FC } from "react";
import { CardWapper } from "./CardWrapper";
import { CardTitle } from "./CardTitle";
import { useStopWatchValue } from "../hooks/useStopWatchValue";
import { StopWatchCardBody } from "./StopWatchCardBody";

type StopWatchProps = {
  defaultTitle?: string;
  onClickDelete: () => void;
  onEditTitle: (title: string) => void;
  playClickSound: () => void;
};

export const StopWatch: FC<StopWatchProps> = ({
  defaultTitle,
  onClickDelete,
  onEditTitle,
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
      <CardTitle
        defaultTitle={defaultTitle}
        onEdit:title={onEditTitle}
        onClick:deleteButton={onClickDelete}
      />
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
