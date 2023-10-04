import { FC } from "react";

interface CardsGridProps {
  children: React.ReactNode;
}

export const CardsGrid: FC<CardsGridProps> = ({ children }) => (
  <div className="container grid gap-4 grid-flow-dense auto-rows-min grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
    {children}
  </div>
);
