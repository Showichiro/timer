import { FC, ReactNode } from "react";
import { Card } from "react-daisyui";
import { clsx } from "clsx";

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
