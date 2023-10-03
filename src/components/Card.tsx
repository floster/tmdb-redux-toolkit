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

  const addFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addFavorite(String(data.title));
    setIsFavorite(true);
  };

  const removeFavoriteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFavorite(String(data.title));
    setIsFavorite(true);
  };

  return (
    <article className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <h2 className="text-base font-bold text-sky-800">{data.title}</h2>
        <p className="text-gray-500 text-sm mb-3">
          {" "}
          ({new Date(data.release_date).getFullYear()})
        </p>
        <p className="text-gray-500 text-sm">{data.overview}</p>
      </div>
      <div className="p-4 bg-gray-100 mt-auto">
        {!isFavorite && (
          <button
            onClick={addFavoriteHandler}
            className="flex items-center justify-center px-4 py-2 bg-slate-200 hover:bg-blue-400 rounded"
          >
            add to ⭐️
          </button>
        )}
        {isFavorite && (
          <button
            onClick={removeFavoriteHandler}
            className="flex items-center justify-center px-4 py-2 bg-slate-200 hover:bg-blue-400 rounded"
          >
            remove from ⭐️
          </button>
        )}
      </div>
    </article>
  );
};
