import { TimerValue } from "../types/TimerValue";

export const getTimerFromUrl = (): TimerValue | null => {
    const url = window.location.href.split("/").slice(-1)[0];
    if (url) {
        // paramが0埋めあり2桁の数字のとき
        if (url.match(/^[0-9]{1,2}$/)) {
            return {
                hours: 0,
                minutes: parseInt(url),
                seconds: 0,
            }
        }
        // paramが22:22の形式のとき
        if (url.match(/^[0-9]{1,2}:[0-9]{1,2}$/)) {
            const [minutes, seconds] = url.split(":");
            return {
                hours: 0,
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
            }
        }
        // paramが22:22:22の形式のとき
        if (url.match(/^[0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}$/)) {
            const [hours, minutes, seconds] = url.split(":");
            return {
                hours: parseInt(hours),
                minutes: parseInt(minutes),
                seconds: parseInt(seconds),
            }
        }
    }
    return null;
}