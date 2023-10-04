import { useState } from "react";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

export const useFavorite = (id: number) => {
  const { favorites } = useAppSelector((state) => state.tmdb);
  const { addFavorite, removeFavorite } = useActions();
  const [isFavorite, setIsFavorite] = useState(() =>
    favorites.includes(String(id))
  );

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(String(id));
      setIsFavorite(false);
    } else {
      addFavorite(String(id));
      setIsFavorite(true);
    }
  };

  return { isFavorite, toggleFavorite };
};
