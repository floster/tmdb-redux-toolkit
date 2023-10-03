const POSTER_BASE = import.meta.env.VITE_TMDB_POSTER_BASE;

import { FC, useState } from "react";
import { ICollectionPart } from "../models/tmdb.models";
import { useActions } from "../hooks/actions";
import { useAppSelector } from "../hooks/redux";

interface CardProps {
  data: ICollectionPart;
}

export const Card: FC<CardProps> = ({ data }) => {
  const { favorites } = useAppSelector((state) => state.tmdb);
  const { addFavorite, removeFavorite } = useActions();
  const [isFavorite, setIsFavorite] = useState(() =>
    favorites.includes(String(data.title))
  );

  const toggleFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(String(data.title));
      setIsFavorite(false);
    } else {
      addFavorite(String(data.title));
      setIsFavorite(true);
    }
  };

  return (
    <article className="card bg-base-100 shadow-xl">
      <figure>
        <img src={`${POSTER_BASE}${data.poster_path}`} alt={data.title} />
      </figure>
      <div className="card-body px-6 pt-4 pb-2">
        <span className="text-sm text-slate-400">
          {new Date(data.release_date).getFullYear()}
        </span>
        <h2 className="card-title text-base">{data.title}</h2>
        <div className="card-actions justify-end mt-auto">
          <button
            className={`btn btn-md btn-square ${
              isFavorite ? "text-yellow-500" : "text-slate-400"
            }`}
            onClick={toggleFavoriteHandler}
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
        </div>
      </div>
    </article>
  );
};
