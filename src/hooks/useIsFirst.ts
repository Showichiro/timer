import { useEffect } from "react";
import { atomWithStorage } from "jotai/utils";
import { useAtom } from "jotai";

const isFirstAtom = atomWithStorage("isFirst", true);

export const useIsFirst = (): boolean => {
  const [isFirst] = useAtom<boolean>(isFirstAtom);

  useEffect(() => {
    localStorage.setItem("isFirst", "false");
  }, []);
  return isFirst;
};
