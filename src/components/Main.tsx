import { FC } from "react";

interface MainProps {
  children: React.ReactNode;
}

export const Main: FC<MainProps> = ({ children }) => (
  <main className="container mx-auto flex flex-col pt-6">{children}</main>
);
