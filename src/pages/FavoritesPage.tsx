import { useAppSelector } from "../hooks/redux";

export default function FavoritesPage() {
  const { favorites } = useAppSelector((state) => state.tmdb);

  return (
    <section className="container w-3/5 mx-auto mt-8">
      <h1 className="text-lg font-bold my-6">Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-slate-400">no favorites yet... try to add some )</p>
      ) : (
        <ul className="list-none">
          {favorites.map((item) => (
            <li key={item} className="p-4">
              {item}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
