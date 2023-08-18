import { useEffect, useState } from "react";
import { isLocalStorageAvailable } from "../utils/localStorageUtil";

export const useIsFirst = (): boolean => {
  const isAvailable = isLocalStorageAvailable();
  const initializer = () => {
    return isAvailable ? localStorage.getItem("isFirst") == null : true;
  };
  const [isFirst] = useState<boolean>(initializer);

  useEffect(() => {
    localStorage.setItem("isFirst", "false");
  }, []);
  return isFirst;
};
