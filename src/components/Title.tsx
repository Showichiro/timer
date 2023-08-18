import { FC, useCallback } from "react";

type TitleProps = {
  defaultTitle?: string;
  onEditTitle: (title: string) => void;
};

const Title: FC<TitleProps> = ({ defaultTitle = "タイマー", onEditTitle }) => {
  const handleBlur = useCallback(
    ({ target: { value } }: { target: { value: string } }) =>
      onEditTitle(value),
    [onEditTitle],
  );
  return (
    <input
      className="timer-title basis-full dark:bg-gray-700 dark:text-gray-200 h-14 text-2xl md:text-3xl lg:text-4xl truncate ..."
      type="text"
      size={6}
      defaultValue={defaultTitle}
      onBlur={handleBlur}
      onFocus={(e) => e.target.select()}
      aria-label="timer name"
    />
  );
};

export default Title;
