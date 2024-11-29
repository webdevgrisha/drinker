import { FilterResult } from "@/components";
import "../style/Page.css";
import "./CocktailsLayout.css";
import { Outlet, useLocation } from "react-router-dom";

import filterFields from "./filterFields";

function CocktailsLayout() {
  const { pathname } = useLocation();

  const coctailPath: string = pathname.split("/")[1];

  const title: string =
    coctailPath === "cocktails" ? "Cocktails" : "Favourites";

  return (
    <section className="page cocktails">
      <header>
        <h1>{title}</h1>
      </header>
      <section className="filter">
        <FilterResult
          key={coctailPath}
          fields={filterFields}
          searchPlaceholder={"Search by cocktail name"}
        />
      </section>
      <div className="page-content cocktails-content">
        <Outlet />
      </div>
    </section>
  );
}

export default CocktailsLayout;
