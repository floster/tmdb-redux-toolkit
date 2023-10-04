import { useLazyGetCollectionQuery } from "../store/tmdb/tmdb.api";
import { Card } from "../components/Card";
import { CardsGrid } from "../components/CardsGrid";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { SearchField } from "../components/SearchField";

export default function HomePage() {
  const [getCollection, { isLoading, isError, data: collections }] =
    useLazyGetCollectionQuery();

  const handleCollectionClick = (id: number) => {
    getCollection(id);
  };

  return (
    <>
      <SearchField onCollectionItemClick={handleCollectionClick} />
      {isError ? (
        <Error />
      ) : isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-xl font-bold my-6 px-2">{collections?.name}</h2>
          <CardsGrid>
            {collections?.parts.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </CardsGrid>
        </>
      )}
    </>
  );
}
