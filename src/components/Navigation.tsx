import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="shadow-md bg-sky-600 text-white">
      <div className="container flex justify-between items-center h-12 mx-auto p-4">
        <h3>TMDB Search</h3>
        <div className="flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/favorites">Favorites</Link>
        </div>
      </div>
    </nav>
  );
}
