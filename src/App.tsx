import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import Navigation from "./components/Navigation";
import { Main } from "./components/Main";

function App() {
  return (
    <>
      <Navigation />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Main>
    </>
  );
}

export default App;
