const POSTER_BASE = import.meta.env.VITE_TMDB_POSTER_BASE;

import { FC } from "react";
import { ICollectionPart } from "../models/tmdb.models";
import { FavButton } from "./FavButton";

interface CardProps {
  data: ICollectionPart;
}

export const Card: FC<CardProps> = ({ data }) => {
  return (
    <article className="card max-sm:card-side bg-base-100 shadow-xl">
      <figure className="max-sm:w-1/3">
        <img
          className="w-full"
          src={`${POSTER_BASE}${data.poster_path}`}
          alt={data.title}
        />
      </figure>
      <div className="relative card-body px-6 py-4">
        <h2 className="card-title text-base max-sm:text-lg">{data.title}</h2>
        <span className="text-sm text-slate-400">
          {new Date(data.release_date).getFullYear()}
        </span>
        <FavButton id={data.id} />
      </div>
    </article>
  );
};
