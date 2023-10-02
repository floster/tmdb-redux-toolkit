import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="shadow-md bg-sky-600 text-sky-100 dark:bg-sky-800 dark:text-sky-200">
      <div className="container flex justify-between items-center h-12 mx-auto p-4">
        <h3 className="bold">TMDB Search</h3>
        <div className="flex items-center gap-6">
          <Link className="hover:text-sky-400" to="/">
            Home
          </Link>
          <Link className="hover:text-sky-400" to="/favorites">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}
