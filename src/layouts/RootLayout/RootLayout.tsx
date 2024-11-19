import "./RootLayout.css";
import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <header className="root-header">
        <div className="root-container">
          <div className="logo">Drinker</div>
          <nav>
            <NavLink to="/coctails">Coctails</NavLink>
            <NavLink to="/ingredients">Ingredients</NavLink>
            <NavLink to="#">Ulubiony</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <div className="root-container">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default RootLayout;
