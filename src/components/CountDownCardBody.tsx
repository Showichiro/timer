import type { FC } from "react";
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
    <div className="card-body">
      {isEditing && (
        <Edit
          defaultValues={defaultValues}
          onClick:cancel={onClickEditCancel}
          onClick:confirm={onClickEditConfirm}
        />
      )}
      {!isEditing && (
        <>
          <button
            type="button"
            onClick={onClickCount}
            aria-label={t("timer.action.edit")}
            className="timer-count cursor-pointer rounded-sm focus-visible:outline-2 focus-visible:outline-primary"
          >
            <Count
              isExpired={isExpired}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </button>
          <div className="card-actions timer-action grid grid-cols-3 xl:grid-cols-3 pt-0.5 gap-x-2 sm:gap-x-6 gap-y-6 xl:gap-x-2">
            {isVisibleResume && (
              <button
                type="button"
                onClick={onClickResume}
                disabled={disabledResume}
                className="btn btn-md text-xs sm:text-sm px-2 sm:px-4 btn-primary"
              >
                {t("timer.action.resume")}
              </button>
            )}
            {isVisibleStart && (
              <button
                type="button"
                onClick={onClickStart}
                disabled={disabledStart}
                className="btn btn-md text-xs sm:text-sm px-2 sm:px-4 btn-primary"
              >
                {t("timer.action.start")}
              </button>
            )}
            <button
              type="button"
              onClick={onClickPause}
              disabled={disabledPause}
              className="btn btn-md text-xs sm:text-sm px-2 sm:px-4 btn-secondary"
            >
              {t("timer.action.pause")}
            </button>
            <button
              type="button"
              onClick={onClickReset}
              className="btn btn-md text-xs sm:text-sm px-2 sm:px-4 btn-accent"
              disabled={disabledReset}
            >
              {t("timer.action.reset")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};
