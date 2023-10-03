const DEBOUNCE_DELAY = 500;
const MIN_SEARCH_TERM_LENGTH = 4;

import { FC, useEffect, useState } from "react";

import { useDebounce } from "../hooks/debounce";
import { useSearchCollectionQuery } from "../store/tmdb/tmdb.api";

import { Error } from "../components/Error";
import { Loader } from "../components/Loader";

interface SearchFieldProps {
  onCollectionItemClick: (id: number) => void;
}

export const SearchField: FC<SearchFieldProps> = ({
  onCollectionItemClick,
}) => {
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

  const handleCollectionsItemClick = (id: number) => {
    onCollectionItemClick(id);
    console.log(id);
    setDropdown(false);
  };

  useEffect(
    () =>
      setDropdown(debounced.length >= MIN_SEARCH_TERM_LENGTH ? true : false),
    [collectionsSearchData, debounced]
  );

  return (
    <form className="relative w-3/5 mx-auto">
      <input
        type="text"
        className="input input-bordered input-accent dark:bg-slate-900 dark:text-slate-50 w-full"
        placeholder="search for a collection"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />

      <div className="absolute z-10 right-0 left-0 max-h-[70vh] overflow-y-auto rounded-md shadow bg-slate-50">
        {isCollectionsSearchError ? (
          <Error />
        ) : (
          dropdown && (
            <ul className="list-none dark:bg-slate-900 dark:text-slate-300">
              {collectionsSearchData && collectionsSearchData.length === 0 ? (
                <li className="text-slate-400 py-2 px-4">nothing found...</li>
              ) : isCollectionsSearchLoading ? (
                <Loader />
              ) : (
                collectionsSearchData?.map((collection) => (
                  <li
                    className="p-4 cursor-pointer hover:bg-slate-100 hover:text-sky-400 dark:hover:bg-slate-700 dark:hover:text-sky-400"
                    key={collection.id}
                    onClick={() => handleCollectionsItemClick(collection.id)}
                  >
                    {collection.name}
                  </li>
                ))
              )}
            </ul>
          )
        )}
      </div>
    </form>
  );
};
