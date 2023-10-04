import { FC } from "react";
import { useFavorite } from "../hooks/tmdb/favorite";

interface FavButtonProps {
  id: number;
}

export const FavButton: FC<FavButtonProps> = ({ id }) => {
  const { isFavorite, toggleFavorite } = useFavorite(id);

  return (
    <button
      className={`absolute bottom-0 right-0 btn btn-ghost hover:bg-slate-100 btn-square ${
        isFavorite ? "text-yellow-500" : "text-slate-400"
      }`}
      onClick={toggleFavorite}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};
