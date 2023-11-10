import { FC } from "react";
import { TimerValue } from "../types/TimerValue";
import { CardWapper } from "./CardWrapper";
import { CardTitle } from "./CardTitle";
import { CardBody } from "./CardBody";
import { useTimerValue } from "../hooks/useTimerValue";

type TimerProps = {
  id: string;
  defaultTimerValue?: TimerValue;
  defaultTitle?: string;
  onClickDelete: () => void;
  onEditTimerValue: (timerValue: TimerValue) => void;
  onEditTitle: (title: string) => void;
};

export const Timer: FC<TimerProps> = ({
  id,
  defaultTimerValue = {
    hours: 0,
    minutes: 6,
    seconds: 0,
  },
  defaultTitle,
  onClickDelete,
  onEditTimerValue,
  onEditTitle,
}) => {
  const {
    isEditing,
    isRunning,
    currentValue,
    handleClickCount,
    handleClickEditCancel,
    handleClickEditConfirm,
    handleClickPause,
    handleClickReset,
    handleClickResume,
    handleClickStart,
    isExpired,
    isResume,
    isStarted,
  } = useTimerValue({
    defaultTimerValue,
    handleEditTimerValue: onEditTimerValue,
  });
  return (
    <CardWapper isExpired={isExpired}>
      <CardTitle
        defaultTitle={defaultTitle}
        onEdit:title={onEditTitle}
        onClick:deleteButton={onClickDelete}
      />
      <CardBody
        currentValues={currentValue}
        defaultValues={defaultTimerValue}
        id={id}
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
        onClick:editcCancel={handleClickEditCancel}
        onClick:pause={handleClickPause}
        onClick:reset={handleClickReset}
        onClick:resume={handleClickResume}
        onClick:start={handleClickStart}
      />
    </CardWapper>
  );
};
