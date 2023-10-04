const DEBOUNCE_DELAY = 500;
const MIN_SEARCH_TERM_LENGTH = 4;

import { useEffect, useState } from "react";
import { useSearchCollectionQuery } from "../store/tmdb/tmdb.api";
import { useDebounce } from "./debounce";

export const useLiveSearch = (term: string) => {
  // enough - is there enough symbols to show dropdown
  const [enough, setEnough] = useState(false);
  const debounced = useDebounce(term, DEBOUNCE_DELAY);

  const { isLoading, isError, data } = useSearchCollectionQuery(debounced, {
    skip: debounced.length < MIN_SEARCH_TERM_LENGTH,
  });

  // show/hide dropdown if there's a data and debounced > 3 symbols
  useEffect(
    () => setEnough(debounced.length >= MIN_SEARCH_TERM_LENGTH ? true : false),
    [data, debounced]
  );

  return { isLoading, isError, data, enough };
};
