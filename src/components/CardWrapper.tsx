import { clsx } from "clsx";
import type { FC, ReactNode } from "react";
import { Card } from "react-daisyui";

export const CardWapper: FC<{
  isExpired: boolean;
  children: ReactNode;
}> = ({ isExpired, children }) => (
  <Card
    className={clsx("border-2", {
      "border-red-700": isExpired,
      "border-primary-content": !isExpired,
    })}
  >
    {children}
  </Card>
);
