import { clsx } from "clsx";
import type { CSSProperties, FC } from "react";

type Props = {
  isExpired: boolean;
  hours: number;
  minutes: number;
  seconds: number;
};

export const Count: FC<Props> = ({ hours, minutes, seconds, isExpired }) => {
  return (
    <span
      role="timer"
      aria-label={`${hours}h ${minutes}m ${seconds}s`}
      className={clsx("flex justify-center", { "text-red-700": isExpired })}
    >
      <span className="countdown font-mono text-6xl sm:text-8xl xl:text-7xl 2xl:text-8xl">
        <span style={{ "--value": hours, "--digits": 2 } as CSSProperties}>
          {hours}
        </span>
      </span>
      h
      <span className="countdown font-mono text-6xl sm:text-8xl xl:text-7xl 2xl:text-8xl">
        <span style={{ "--value": minutes, "--digits": 2 } as CSSProperties}>
          {minutes}
        </span>
      </span>
      m
      <span className="countdown font-mono text-6xl sm:text-8xl xl:text-7xl 2xl:text-8xl">
        <span style={{ "--value": seconds, "--digits": 2 } as CSSProperties}>
          {seconds}
        </span>
      </span>
      s
    </span>
  );
};
