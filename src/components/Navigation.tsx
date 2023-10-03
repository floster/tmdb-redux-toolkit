import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="navbar bg-accent text-accent-content">
      <div className="flex-1">
        <span className="normal-case text-xl font-bold">TMDB Search</span>
      </div>
      <nav className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
