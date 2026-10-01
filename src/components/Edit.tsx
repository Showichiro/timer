import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TimerValue } from "../types/TimerValue";

const hourOptions = Array.from({ length: 100 }, (_, value) => value);
const minuteSecondOptions = Array.from({ length: 60 }, (_, value) => value);

type Props = {
  defaultValues: TimerValue;
  "onClick:cancel": () => void;
  "onClick:confirm": (data: TimerValue) => void;
};

export const Edit: FC<Props> = ({
  defaultValues,
  "onClick:cancel": onClickCancel,
  "onClick:confirm": onClickConfirm,
}) => {
  const { handleSubmit: onSubmit, register } = useForm<TimerValue>({
    defaultValues,
  });
  const { t } = useTranslation();
  return (
    <form onSubmit={onSubmit(onClickConfirm)}>
      <div className="grid grid-cols-3 gap-2 my-12">
        <div>
          <select
            className="select select-lg w-auto"
            aria-label={t("timer.unit.hours")}
            {...register("hours", { valueAsNumber: true })}
          >
            {hourOptions.map((value) => (
              <option key={`hours-${value}`} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span className="ml-2">h</span>
        </div>
        <div>
          <select
            className="select select-lg w-auto"
            aria-label={t("timer.unit.minutes")}
            {...register("minutes", { valueAsNumber: true })}
          >
            {minuteSecondOptions.map((value) => (
              <option key={`minutes-${value}`} value={value}>
                {value}
              </option>
            ))}
          </select>

          <span className="ml-2">m</span>
        </div>
        <div>
          <select
            className="select select-lg w-auto"
            aria-label={t("timer.unit.seconds")}
            {...register("seconds", { valueAsNumber: true })}
          >
            {minuteSecondOptions.map((value) => (
              <option key={`minutes-${value}`} value={value}>
                {value}
              </option>
            ))}
          </select>
          <span className="ml-2">s</span>
        </div>
      </div>
      <div className="card-actions grid grid-cols-2 pt-0.5 gap-x-6 gap-y-6 xl:gap-x-2">
        <button
          type="button"
          className="btn btn-lg btn-warning"
          onClick={onClickCancel}
        >
          {t("timer.action.cancel")}
        </button>
        <button type="submit" className="btn btn-lg btn-primary">
          {t("timer.action.confirm")}
        </button>
      </div>
    </form>
  );
};
