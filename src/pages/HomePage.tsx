import { useLazyGetCollectionQuery } from "../store/tmdb/tmdb.api";
import { Card } from "../components/Card";
import { CardsGrid } from "../components/CardsGrid";
import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { SearchField } from "../components/SearchField";

export default function HomePage() {
  const [
    getCollection,
    {
      isLoading: isCollectionLoading,
      isError: isCollectionError,
      data: collectionData,
    },
  ] = useLazyGetCollectionQuery();

  const handleCollectionClick = (id: number) => {
    getCollection(id);
  };

  return (
    <>
      <SearchField onCollectionItemClick={handleCollectionClick} />
      {isCollectionError ? (
        <Error />
      ) : isCollectionLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-xl font-bold my-6 px-4">
            {collectionData?.name}
          </h2>
          <CardsGrid>
            {collectionData?.parts.map((item) => (
              <Card key={item.id} data={item} />
            ))}
          </CardsGrid>
        </>
      )}
    </>
  );
}
