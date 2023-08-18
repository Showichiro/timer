import { FC } from "react";
import { TimerValue } from "../types/TimerValue";
import { useForm } from "react-hook-form";
import { Button, Card, Select } from "react-daisyui";
import { useTranslation } from "react-i18next";

type Props = {
  defaultValues: TimerValue;
  id: string;
  "onClick:cancel": () => void;
  "onClick:confirm": (data: TimerValue) => void;
};

export const Edit: FC<Props> = ({
  defaultValues,
  id,
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
        <label htmlFor={`${id}-hours`}>
          <Select size="lg" id={`${id}-hours`} {...register("hours")}>
            {[...Array(100)].map((_, i) => (
              <option key={`hours-${i}`} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <span className="ml-2">h</span>
        </label>
        <label htmlFor={`${id}-minutes`}>
          <Select size="lg" id={`${id}-minutes`} {...register("minutes")}>
            {[...Array(60)].map((_, i) => (
              <option key={`minutes-${i}`} value={i}>
                {i}
              </option>
            ))}
          </Select>

          <span className="ml-2">m</span>
        </label>
        <label htmlFor={`${id}-seconds`}>
          <Select size="lg" id={`${id}-seconds`} {...register("seconds")}>
            {[...Array(60)].map((_, i) => (
              <option key={`minutes-${i}`} value={i}>
                {i}
              </option>
            ))}
          </Select>
          <span className="ml-2">s</span>
        </label>
      </div>
      <Card.Actions className="grid grid-cols-2 pt-0.5 gap-x-6 gap-y-6 xl:gap-x-2">
        <Button size="lg" color="warning" onClick={onClickCancel}>
          {t("timer.action.cancel")}
        </Button>
        <Button type="submit" size="lg" color="primary">
          {t("timer.action.confirm")}
        </Button>
      </Card.Actions>
    </form>
  );
};
