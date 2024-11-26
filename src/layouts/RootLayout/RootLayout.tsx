import { SVG_Logo } from "@/assets";
import "./RootLayout.css";
import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {

  return (
    <>
      <header className="root-header">
        <div className="root-container">
          <div className="logo">
            <span className="icon">
              <SVG_Logo />
            </span>
            <span>Drinker</span>
          </div>
          <nav>
            <NavLink to="/cocktails">Cocktails</NavLink>
            <NavLink to="/ingredients">Ingredients</NavLink>
            <NavLink to="/favourites">Favourites</NavLink>
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
