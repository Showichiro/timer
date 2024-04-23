import type { FC, ReactNode } from "react";

export const MainLayout: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="p-2">
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 pt-2">{children}</div>
  </main>
);
