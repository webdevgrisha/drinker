import "./IngredientList.css";
import getCotails from "../../../services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import PageSwitcher from "../../../components/PageSwitcher/PageSwitcher";
import Loader from "../../../components/Loader/Loader";
import { Outlet, useLocation } from "react-router-dom";
import IngredientCard from "../IngredientCard/IngredientCard";
import { ResponseData } from "../interfaces";

async function getCards({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getCotails(`/ingredients/${search}`);

  return response;
}

function IngredientList() {
  const location = useLocation();

  const { search } = location;

  const { data, isLoading, error } = useQuery([search], getCards);

  if (error) return <p>Error loading data.</p>;

  const cards = data as ResponseData;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-list">
          {cards.data.map((cocktailData) => {
            return <IngredientCard key={cocktailData.id} data={cocktailData} />;
          })}
        </div>
      )}
      <PageSwitcher metaData={cards?.meta || null} />
      <Outlet />
    </>
  );
}

export default IngredientList;
