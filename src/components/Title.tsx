import { type PrimitiveAtom, useAtomValue } from "jotai";
import { useAtomCallback } from "jotai/utils";
import { type FC, useCallback } from "react";

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
    <input
      className="input input-primary min-w-0 w-full timer-title basis-full h-14 text-2xl md:text-3xl lg:text-4xl truncate ..."
      type="text"
      value={value}
      onChange={(e) => changeValue(e.target.value)}
      aria-label="timer name"
    />
  );
};

export default Title;
