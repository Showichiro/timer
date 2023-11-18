import { TimerValue } from "../types/TimerValue";

/**
 * The function converts a timer value (hours, minutes, seconds) into a timestamp by adding the
 * corresponding time duration to the current timestamp.
 * @param {TimerValue} timerValue - An object that contains `hours`, `minutes`, and `seconds` properties.
 * @returns a new Date object that represents the current time plus the specified hours, minutes, and
 * seconds.
 */
export const convertTimerValueToTimeStamp = ({
  hours,
  minutes,
  seconds,
}: TimerValue) => {
  const weight = 1000;
  const now = Date.now();
  return new Date(
    now + hours * 60 * 60 * weight + minutes * 60 * weight + seconds * weight,
  );
};
