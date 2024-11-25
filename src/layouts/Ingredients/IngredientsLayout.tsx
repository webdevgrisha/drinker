import { FilterResult } from "@/components";
import "./IngredientsLayout.css";
import { Outlet } from "react-router-dom";

function IngredientsLayout() {
  return (
    <section className="cocktails">
      <header>
        <h1>Ingredients</h1>
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

export default IngredientsLayout;
