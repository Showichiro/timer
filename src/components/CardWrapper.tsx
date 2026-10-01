import { clsx } from "clsx";
import type { FC, ReactNode } from "react";

export const CardWapper: FC<{
  isExpired: boolean;
  children: ReactNode;
}> = ({ isExpired, children }) => (
  <div
    className={clsx("card border-2", {
      "border-red-700": isExpired,
      "border-primary-content": !isExpired,
    })}
  >
    {children}
  </div>
);
