import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { TimerType } from "../hooks/useTimerList";

const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

export const Header: FC<{ addTimer: (type: TimerType) => void }> = ({
  addTimer,
}) => {
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 z-50 px-2">
      <div className="navbar bg-base-100">
        <div className="flex-1 shrink-0">
          <div className="text-xl sm:text-3xl whitespace-nowrap normal-case font-black">
            {t("title")}
          </div>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-0 sm:px-3">
            <li>
              <details className="timer-add">
                <summary className="text-xs sm:text-sm px-2 sm:px-3">
                  {t("header.menu.timer.title")}
                </summary>
                <ul className="p-2 bg-base-100 z-10">
                  <li>
                    <button type="button" onClick={() => addTimer("countdown")}>
                      {t("header.menu.timer.countdown")}
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={() => addTimer("stopwatch")}>
                      {t("header.menu.timer.stopwatch")}
                    </button>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details className="timer-theme">
                <summary className="text-xs sm:text-sm px-2 sm:px-3">
                  {t("header.menu.theme")}
                </summary>
                <ul className="p-2 bg-base-100 z-10 right-0 max-h-[calc(100dvh-6rem)] overflow-y-auto">
                  {themes.map((val) => (
                    <li data-theme={val} key={`theme-${val}`}>
                      <button
                        type="button"
                        data-set-theme={val}
                        data-act-class="ACTIVECLASS"
                      >
                        {val}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
