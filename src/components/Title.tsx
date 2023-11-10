import { FC, useCallback } from "react";
import { Input } from "react-daisyui";
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
    <Input
      className="timer-title basis-full h-14 text-2xl md:text-3xl lg:text-4xl truncate ..."
      type="text"
      bordered
      color="primary"
      defaultValue={defaultTitle ?? defaultTitleText}
      onBlur={handleBlur}
      aria-label="timer name"
    />
  );
};

export default Title;
