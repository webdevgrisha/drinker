import { FilterResult } from "@/components";
import "./IngredientsLayout.css";
import { Outlet } from "react-router-dom";
import filterFields from "./filterFields";

function IngredientsLayout() {
  return (
    <section className="page ingredients">
      <header>
        <h1>Ingredients</h1>
      </header>
      <section className="filter">
        <FilterResult fields={filterFields} searchPlaceholder={"Search by ingredient name"} />
      </section>
      <div className="ingredients-content">
        <Outlet />
      </div>
    </section>
  );
}

export default IngredientsLayout;
