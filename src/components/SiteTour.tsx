import type { FC } from "react";
import { useTranslation } from "react-i18next";
import Joyride from "react-joyride";

export const SiteTour: FC = () => {
  const { t } = useTranslation();
  return (
    <Joyride
      steps={[
        {
          content: (
            <>
              <h2>{t("welcomeMessage.title")}</h2>
              <h3>{t("welcomeMessage.detail")}</h3>
            </>
          ),
          placement: "center",
          target: "body",
        },
        {
          content: <h2>{t("description.timerAction")}</h2>,
          target: ".timer-action",
        },
        {
          content: <h2>{t("description.timerTitle")}</h2>,
          target: ".timer-title",
        },
        {
          content: <h2>{t("description.timerCount")}</h2>,
          target: ".timer-count",
        },
        {
          content: <h2>{t("description.timerDelete")}</h2>,
          target: ".timer-delete",
        },
        {
          content: <h2>{t("description.timerAdd")}</h2>,
          target: ".timer-add",
        },
        {
          content: <h2>{t("description.timerTheme")}</h2>,
          target: ".timer-theme",
        },
      ]}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
    />
  );
};
