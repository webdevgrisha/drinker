import "./RootLayout.css";
import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <header>
        <div className="logo">Drinker</div>
        <nav>
          <NavLink to="/coctails">Coctails</NavLink>
          <NavLink to="/ingredients">Ingredients</NavLink>
          <NavLink to="#">Ulubiony</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
