import { FilterResult } from "@/components";
import "./CocktailsLayout.css";
import { Outlet, useLocation,  } from "react-router-dom";

function CocktailsLayout() {
  const { pathname } = useLocation();

  const coctailPath: string = pathname.split("/")[1];

  const title: string =
    coctailPath === "cocktails" ? "Cocktails" : "Favourites";

  return (
    <section className="cocktails">
      <header>
        <h1>{title}</h1>
      </header>
      <section className="filter">
        <FilterResult key={coctailPath} />
      </section>
      <div className="cocktails-content">
        <Outlet />
      </div>
    </section>
  );
}

export default CocktailsLayout;
