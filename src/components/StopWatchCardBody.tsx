import { FC } from "react";
import { Button, Card } from "react-daisyui";
import { Count } from "./Count";
import { useTranslation } from "react-i18next";
import { TimerValue } from "../types/TimerValue";

export const StopWatchCardBody: FC<{
  currentValues: TimerValue;
  "isVisible:resume": boolean;
  "isVisible:start": boolean;
  "disabled:resume": boolean;
  "disabled:start": boolean;
  "disabled:pause": boolean;
  "disabled:reset": boolean;
  "onClick:start": () => void;
  "onClick:resume": () => void;
  "onClick:pause": () => void;
  "onClick:reset": () => void;
}> = ({
  currentValues: { hours, minutes, seconds },
  "isVisible:resume": isVisibleResume,
  "isVisible:start": isVisibleStart,
  "disabled:resume": disabledResume,
  "disabled:start": disabledStart,
  "disabled:pause": disabledPause,
  "disabled:reset": disabledReset,
  "onClick:start": onClickStart,
  "onClick:resume": onClickResume,
  "onClick:pause": onClickPause,
  "onClick:reset": onClickReset,
}) => {
  const { t } = useTranslation();
  return (
    <Card.Body>
      <Count
        isExpired={false}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
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
    </Card.Body>
  );
};
