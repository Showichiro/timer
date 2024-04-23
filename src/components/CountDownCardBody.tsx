import type { FC } from "react";
import { Button, Card } from "react-daisyui";
import { useTranslation } from "react-i18next";
import type { TimerValue } from "../types/TimerValue";
import { Count } from "./Count";
import { Edit } from "./Edit";

export const CountDownCardBody: FC<{
  isEditing: boolean;
  defaultValues: TimerValue;
  currentValues: TimerValue;
  isExpired: boolean;
  "isVisible:resume": boolean;
  "isVisible:start": boolean;
  "disabled:resume": boolean;
  "disabled:start": boolean;
  "disabled:pause": boolean;
  "disabled:reset": boolean;
  "onClick:editCancel": () => void;
  "onClick:editConfirm": (value: TimerValue) => void;
  "onClick:count": () => void;
  "onClick:start": () => void;
  "onClick:resume": () => void;
  "onClick:pause": () => void;
  "onClick:reset": () => void;
}> = ({
  isEditing,
  defaultValues,
  currentValues: { hours, minutes, seconds },
  isExpired,
  "isVisible:resume": isVisibleResume,
  "isVisible:start": isVisibleStart,
  "disabled:resume": disabledResume,
  "disabled:start": disabledStart,
  "disabled:pause": disabledPause,
  "disabled:reset": disabledReset,
  "onClick:editCancel": onClickEditCancel,
  "onClick:editConfirm": onClickEditConfirm,
  "onClick:count": onClickCount,
  "onClick:start": onClickStart,
  "onClick:resume": onClickResume,
  "onClick:pause": onClickPause,
  "onClick:reset": onClickReset,
}) => {
  const { t } = useTranslation();
  return (
    <Card.Body>
      {isEditing && (
        <Edit
          defaultValues={defaultValues}
          onClick:cancel={onClickEditCancel}
          onClick:confirm={onClickEditConfirm}
        />
      )}
      {!isEditing && (
        <>
          <div
            onClick={onClickCount}
            onKeyUp={onClickCount}
            className="timer-count"
          >
            <Count
              isExpired={isExpired}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </div>
          <Card.Actions className="timer-action grid grid-cols-3 xl:grid-cols-3 pt-0.5 gap-x-6 gap-y-6 xl:gap-x-2">
            {isVisibleResume && (
              <Button
                onClick={onClickResume}
                disabled={disabledResume}
                size="md"
                color="primary"
              >
                {t("timer.action.resume")}
              </Button>
            )}
            {isVisibleStart && (
              <Button
                onClick={onClickStart}
                disabled={disabledStart}
                size="md"
                color="primary"
              >
                {t("timer.action.start")}
              </Button>
            )}
            <Button
              onClick={onClickPause}
              disabled={disabledPause}
              size="md"
              color="secondary"
            >
              {t("timer.action.pause")}
            </Button>
            <Button
              onClick={onClickReset}
              size="md"
              color="accent"
              disabled={disabledReset}
            >
              {t("timer.action.reset")}
            </Button>
          </Card.Actions>
        </>
      )}
    </Card.Body>
  );
};
