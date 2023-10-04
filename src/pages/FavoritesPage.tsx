import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useLazyGetMovieQuery } from "../store/tmdb/tmdb.api";
import { ICollectionPart } from "../models/tmdb.models";

import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { CardsGrid } from "../components/CardsGrid";
import { Card } from "../components/Card";

export default function FavoritesPage() {
  const { favorites } = useAppSelector((state) => state.tmdb);
  const [tiles, setTiles] = useState<ICollectionPart[] | []>([]);

  const [getMovie, { isError, isLoading }] = useLazyGetMovieQuery();

  // go through favorites and get each movie, for that:
  useEffect(() => {
    const getFavorites = async () => {
      // 3. waiting for all promises to resolve
      const favs = await Promise.all(
        // 1. went through favorites IDs
        favorites.map(async (id) => {
          // 2. return a promise for each movie to get the data
          const { data } = await getMovie(id);
          return data;
        })
      );
      // 5. set the tiles
      setTiles(
        // 4. filter out undefined values
        favs.filter((tile): tile is ICollectionPart => tile !== undefined)
      );
    };
    getFavorites();
  }, [favorites]);

  return (
    <>
      {isError ? (
        <Error />
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-xl font-bold my-6 px-2">Favorites</h2>
          <CardsGrid>
            {tiles?.map((tile) => (
              <Card key={tile.id} data={tile} />
            ))}
          </CardsGrid>
        </>
      )}
    </>
  );
}
