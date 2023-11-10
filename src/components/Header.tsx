import { FC } from "react";
import { Menu } from "react-daisyui";
import { useTranslation } from "react-i18next";

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

export const Header: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 z-50 px-2">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="text-3xl normal-case font-black">{t("title")}</div>
        </div>
        <div className="flex-none">
          <Menu horizontal className="px-3">
            <li>
              <details>
                <summary>Theme</summary>
                <ul className="p-2 bg-base-100">
                  {themes.map((val) => (
                    <li data-theme={val} key={`theme-${val}`}>
                      <button data-set-theme={val} data-act-class="ACTIVECLASS">
                        {val}
                      </button>
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          </Menu>
        </div>
      </div>
    </div>
  );
};
