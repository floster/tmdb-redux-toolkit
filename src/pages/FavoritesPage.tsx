import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { CardsGrid } from "../components/CardsGrid";
import { Card } from "../components/Card";

import { useMovies } from "../hooks/tmdb/movies";

export default function FavoritesPage() {
  const { isError, isLoading, tiles } = useMovies();

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
