import { FC } from "react";
import { Countdown } from "react-daisyui";

type Props = {
  isExpired: boolean;
  hours: number;
  minutes: number;
  seconds: number;
};

export const Count: FC<Props> = ({ hours, minutes, seconds, isExpired }) => {
  return (
    <div className={`flex justify-center ${isExpired ? "text-red-700" : ""}`}>
      <Countdown value={hours} className="text-8xl xl:text-9xl" />
      h
      <Countdown value={minutes} className="text-8xl xl:text-9xl" />
      m
      <Countdown value={seconds} className="text-8xl xl:text-9xl" />s
    </div>
  );
};
