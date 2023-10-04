import { FC, useEffect, useState } from "react";

import { Error } from "../components/Error";
import { Loader } from "../components/Loader";
import { useLiveSearch } from "../hooks/liveSearch";

interface SearchFieldProps {
  onCollectionItemClick: (id: number) => void;
}

export const SearchField: FC<SearchFieldProps> = ({
  onCollectionItemClick,
}) => {
  const [term, setTerm] = useState("");
  const { data, enough, isError, isLoading } = useLiveSearch(term);
  const [dropdownVisible, setDropdownVisible] = useState(enough);

  const handleCollectionsItemClick = (id: number) => {
    onCollectionItemClick(id);
    setTerm("");
    setDropdownVisible(false);
  };

  useEffect(() => {
    setDropdownVisible(enough);
  }, [enough]);

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
        {isError ? (
          <Error />
        ) : (
          dropdownVisible && (
            <ul className="list-none dark:bg-slate-900 dark:text-slate-300">
              {data && data.length === 0 ? (
                <li className="text-slate-400 py-2 px-4">nothing found...</li>
              ) : isLoading ? (
                <Loader />
              ) : (
                data?.map((collection) => (
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
