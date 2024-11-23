import { FilterResult } from "@/components";
import "./CocktailsLayout.css";
import { Outlet } from "react-router-dom";

function CocktailsLayout() {
  return (
    <section className="cocktails">
      <header>
        <h1>Cocktails</h1>
      </header>
      <section className="filter">
        <FilterResult />
      </section>
      <div className="cocktails-content">
        <Outlet />
      </div>
    </section>
  );
}

export default CocktailsLayout;
