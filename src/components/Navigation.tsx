import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="flex justify-between items-center h-12 px-5 shadow-md bg-sky-600 text-white">
      <h3>TMDB Search</h3>

      <div className="flex items-center gap-3">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}
