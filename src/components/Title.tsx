import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

type TitleProps = {
  defaultTitle?: string;
  onEditTitle: (title: string) => void;
};

const Title: FC<TitleProps> = ({ defaultTitle, onEditTitle }) => {
  const handleBlur = useCallback(
    ({ target: { value } }: { target: { value: string } }) =>
      onEditTitle(value),
    [onEditTitle],
  );
  const { t } = useTranslation();
  const defaultTitleText = t("timer.defaultTitle");
  return (
    <input
      className="timer-title basis-full dark:bg-gray-700 dark:text-gray-200 h-14 text-2xl md:text-3xl lg:text-4xl truncate ..."
      type="text"
      size={6}
      defaultValue={defaultTitle ?? defaultTitleText}
      onBlur={handleBlur}
      aria-label="timer name"
    />
  );
};

export default Title;
