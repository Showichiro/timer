import type { FC } from "react";
import { Menu } from "react-daisyui";
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
        <div className="flex-1">
          <div className="text-3xl normal-case font-black">{t("title")}</div>
        </div>
        <div className="flex-none">
          <Menu horizontal className="px-3">
            <Menu.Item>
              <details className="timer-add">
                <summary>{t("header.menu.timer.title")}</summary>
                <ul className="p-2 bg-base-100">
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
            </Menu.Item>
            <Menu.Item>
              <details className="timer-theme">
                <summary>{t("header.menu.theme")}</summary>
                <ul className="p-2 bg-base-100">
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
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  );
};
