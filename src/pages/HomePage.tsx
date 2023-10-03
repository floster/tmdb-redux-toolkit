const DEBOUNCE_DELAY = 500;
const MIN_SEARCH_TERM_LENGTH = 4;

import { useEffect, useState } from "react";
import {
  useSearchCollectionQuery,
  useLazyGetCollectionQuery,
} from "../store/tmdb/tmdb.api";
import { useDebounce } from "../hooks/debounce";
import { Card } from "../components/Card";

const Error = () => (
  <span className="text-red-400">Something went wrong...</span>
);

const Loading = () => <span className="text-blue-400">Loading...</span>;

export default function HomePage() {
  const [term, setTerm] = useState("");
  // show/hide dropdown if there's a data and debounced > 3 symbols
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(term, DEBOUNCE_DELAY);

  const {
    isLoading: isCollectionsSearchLoading,
    isError: isCollectionsSearchError,
    data: collectionsSearchData,
  } = useSearchCollectionQuery(debounced, {
    skip: debounced.length < MIN_SEARCH_TERM_LENGTH,
  });

  const [
    getCollection,
    {
      isLoading: isCollectionLoading,
      isError: isCollectionError,
      data: collectionData,
    },
  ] = useLazyGetCollectionQuery();

  const handleCollectionsItemClick = (id: number) => {
    getCollection(id);
    setDropdown(false);
  };

  useEffect(
    () =>
      setDropdown(debounced.length >= MIN_SEARCH_TERM_LENGTH ? true : false),
    [collectionsSearchData, debounced]
  );

  return (
    <>
      <div className="container flex justify-between items-center mx-auto p-4">
        <div className="w-3/5 mx-auto">
          <input
            type="text"
            className="form-input px-4 py-3 rounded-full w-full dark:bg-slate-900 dark:text-slate-50"
            placeholder="search for a movie"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />

          <div className="max-h-[70vh] overflow-y-auto rounded-md shadow bg-slate-50">
            {isCollectionsSearchError ? (
              <Error />
            ) : (
              dropdown && (
                <ul className="list-none dark:bg-slate-900 dark:text-slate-300">
                  {collectionsSearchData &&
                  collectionsSearchData.length === 0 ? (
                    <li className="text-slate-400 py-2 px-4">
                      nothing found...
                    </li>
                  ) : isCollectionsSearchLoading ? (
                    <Loading />
                  ) : (
                    collectionsSearchData?.map((collection) => (
                      <li
                        className="p-4 cursor-pointer hover:bg-slate-100 hover:text-sky-400 dark:hover:bg-slate-700 dark:hover:text-sky-400"
                        key={collection.id}
                        onClick={() =>
                          handleCollectionsItemClick(collection.id)
                        }
                      >
                        {collection.name}
                      </li>
                    ))
                  )}
                </ul>
              )
            )}
          </div>
          <section className="container w-[100%] dark:text-sky-300">
            {isCollectionError ? (
              <Error />
            ) : isCollectionLoading ? (
              <Loading />
            ) : (
              <div>
                <h2 className="text-lg font-bold my-6 px-4">
                  {collectionData?.name}
                </h2>
                <div className="container grid grid-cols-3 gap-4">
                  {collectionData?.parts.map((item) => (
                    <Card key={item.id} data={item} />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
