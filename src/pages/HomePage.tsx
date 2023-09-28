import { useSearchMovieQuery } from "../store/tmdb/tmdb.api";

export default function HomePage() {
  const { isLoading, isError, data } = useSearchMovieQuery("rambo");
  console.log("data", data);

  return <div>HomePage</div>;
}
