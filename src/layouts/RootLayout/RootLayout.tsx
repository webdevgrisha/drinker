import { SVG_Logo } from "@/assets";
import "./RootLayout.css";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import classNames from "classnames";

function RootLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navMenuClasses = classNames({ "nav-menu": true, open: isMenuOpen });

  console.log("isMenuOpen: ", isMenuOpen);
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
          <div className="burger-btn">
            <input
              type="checkbox"
              role="button"
              aria-label="Display the menu"
              className="menu"
              checked={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            />
          </div>
          <nav
            className={navMenuClasses}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <ul>
              <li>
                <NavLink to="/cocktails">Cocktails</NavLink>
              </li>
              <li>
                <NavLink to="/ingredients">Ingredients</NavLink>
              </li>
              <li>
                <NavLink to="/favourites">Favourites</NavLink>
              </li>
            </ul>
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
