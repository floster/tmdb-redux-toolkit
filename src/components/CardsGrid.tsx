import { FC } from "react";

interface CardsGridProps {
  children: React.ReactNode;
}

export const CardsGrid: FC<CardsGridProps> = ({ children }) => (
  <div className="container grid grid-cols-4 gap-4">{children}</div>
);
