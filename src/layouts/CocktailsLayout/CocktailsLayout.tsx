import "./CocktailsLayout.css";
import { NavLink, Outlet } from "react-router-dom";

function CocktailsLayout() {
  return (
    <section className="cocktails">
      <header>
        <h1>Cocktails</h1>
        <nav>
          <NavLink to="glasses">Glasses</NavLink>
          <NavLink to="categories">Categories</NavLink>
        </nav>
      </header>
      <div className="cocktails-content">
        <Outlet />
      </div>
    </section>
  );
}

export default CocktailsLayout;
