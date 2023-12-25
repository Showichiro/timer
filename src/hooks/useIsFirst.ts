import { useEffect, useState } from "react";
import { isLocalStorageAvailable } from "../utils/localStorageUtil";

/**
 * The `useIsFirst` function returns a boolean value indicating whether it is the first time the user
 * is accessing the application.
 * @returns The function `useIsFirst` returns a boolean value.
 */
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
