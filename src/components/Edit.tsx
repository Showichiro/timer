import type { FC } from "react";
import { Button, Card, Select } from "react-daisyui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { TimerValue } from "../types/TimerValue";

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
          <Select size="lg" {...register("hours")}>
            {[...Array(100)].map((_, i) => (
              <option
                key={`hours-${
                  // biome-ignore lint/suspicious/noArrayIndexKey:
                  i
                }`}
                value={i}
              >
                {i}
              </option>
            ))}
          </Select>
          <span className="ml-2">h</span>
        </div>
        <div>
          <Select size="lg" {...register("minutes")}>
            {[...Array(60)].map((_, i) => (
              <option
                key={`minutes-${
                  // biome-ignore lint/suspicious/noArrayIndexKey:
                  i
                }`}
                value={i}
              >
                {i}
              </option>
            ))}
          </Select>

          <span className="ml-2">m</span>
        </div>
        <div>
          <Select size="lg" {...register("seconds")}>
            {[...Array(60)].map((_, i) => (
              <option
                key={`minutes-${
                  // biome-ignore lint/suspicious/noArrayIndexKey:
                  i
                }`}
                value={i}
              >
                {i}
              </option>
            ))}
          </Select>
          <span className="ml-2">s</span>
        </div>
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
