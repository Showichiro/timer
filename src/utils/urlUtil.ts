import type { TimerValue } from "../types/TimerValue";

/**
 * The function `getTimerFromUrl` parses the URL and returns a TimerValue object if the URL contains a
 * valid timer value, otherwise it returns null.
 * @returns The function `getTimerFromUrl` returns a value of type `TimerValue` or `null`.
 */
export const getTimerFromUrl = (): TimerValue | null => {
  const url = window.location.href.split("/").slice(-1)[0];
  if (url) {
    // paramが0埋めあり2桁の数字のとき
    if (url.match(/^[0-9]{1,2}$/)) {
      return {
        hours: 0,
        minutes: Number.parseInt(url),
        seconds: 0,
      };
    }
    // paramが22:22の形式のとき
    if (url.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
      const [minutes, seconds] = url.split(":");
      return {
        hours: 0,
        minutes: Number.parseInt(minutes),
        seconds: Number.parseInt(seconds),
      };
    }
    // paramが22:22:22の形式のとき
    if (url.match(/^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/)) {
      const [hours, minutes, seconds] = url.split(":");
      return {
        hours: Number.parseInt(hours),
        minutes: Number.parseInt(minutes),
        seconds: Number.parseInt(seconds),
      };
    }
  }
  return null;
};
