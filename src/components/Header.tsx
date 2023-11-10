import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Header: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="sticky top-0 z-50 px-2">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <div className="text-3xl normal-case font-black">{t("title")}</div>
        </div>
      </div>
    </div>
  );
};
