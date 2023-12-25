import { PrimitiveAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { FC, useCallback } from "react";
import { Input } from "react-daisyui";

type TitleProps = {
  titleAtom: PrimitiveAtom<string>;
};

const Title: FC<TitleProps> = ({ titleAtom }) => {
  const value = useAtomValue(titleAtom);
  const changeValue = useAtomCallback(
    useCallback(
      (_get, set, value: string) => {
        set(titleAtom, value);
      },
      [titleAtom],
    ),
  );
  return (
    <Input
      className="timer-title basis-full h-14 text-2xl md:text-3xl lg:text-4xl truncate ..."
      type="text"
      bordered
      color="primary"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      aria-label="timer name"
    />
  );
};

export default Title;
