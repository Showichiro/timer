import { type PrimitiveAtom, useAtom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";
import { useCallback } from "react";
import i18n from "../i18n/configs";
import type { TimerValue } from "../types/TimerValue";
import { getTimerFromUrl } from "../utils/urlUtil";

export type TimerType = "countdown" | "stopwatch";

const key = "timerList";

export type Timer = {
  type: TimerType;
  timerValue: TimerValue | undefined;
  title: string;
};

const defaultValue = {
  timerValue: undefined,
  title: i18n.t("timer.defaultTitle"),
  type: "countdown",
} as const satisfies Timer;

export const initializer = (): Timer[] => {
  // URLからタイマーを取得する
  const urlValue = getTimerFromUrl();

  const savedList = localStorage.getItem(key);
  if (!savedList) {
    return urlValue
      ? [{ title: "タイマー", timerValue: urlValue, type: "countdown" }]
      : [defaultValue];
  }
  const parsed = JSON.parse(savedList) as Timer[];
  return urlValue
    ? [
        { title: "タイマー", timerValue: urlValue, type: "countdown" },
        ...parsed,
      ]
    : parsed;
};

const timerListAtom = atomWithStorage(key, initializer());
const timerAtomAtomList = splitAtom(timerListAtom);

const useTimerList = () => {
  const [timerAtomList, dispatch] = useAtom(timerAtomAtomList);

  const insertTimer = useCallback(
    (timer: Partial<Timer> = defaultValue) =>
      dispatch({ type: "insert", value: { ...defaultValue, ...timer } }),
    [dispatch],
  );

  const removeTimer = useCallback(
    (atom: PrimitiveAtom<Timer>) => dispatch({ type: "remove", atom }),
    [dispatch],
  );

  return { timerAtomList, insertTimer, removeTimer };
};

export default useTimerList;
