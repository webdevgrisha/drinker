import "./CocktailList.css";
import { ResponseData } from "../../../components/interfaces";
import getCotails from "../../../services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import CocktailCard from "../CocktailCard/CocktailCard";
import PageSwitcher from "../../../components/PageSwitcher/PageSwitcher";
import Loader from "../../../components/Loader/Loader";
import { Outlet, useLocation } from "react-router-dom";

async function getCards({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getCotails(`/cocktails/${search}`);

  return response;
}

function CocktailList() {
  const location = useLocation();

  console.log("location: ", location);
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
            return <CocktailCard key={cocktailData.id} data={cocktailData} />;
          })}
        </div>
      )}
      <PageSwitcher metaData={cards?.meta || null} />
      <Outlet />
    </>
  );
}

export default CocktailList;
