import "./CocktailList.css";
import { ResponseData } from "../interfaces";
import getCotails from "../../../services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import CocktailCard from "../CocktailCard/CocktailCard";
import PageSwitcher from "../../../components/PageSwitcher/PageSwitcher";
import Loader from "../../../components/Loader/Loader";
import { Outlet, useLocation } from "react-router-dom";

async function getCards({ queryKey }: { queryKey: [string, string] }) {
  const [_key, search] = queryKey;
  const response = await getCotails(`/cocktails${search}`);

  return response;
}

function CocktailList() {
  const location = useLocation();

  console.log("location: ", location);
  const { search } = location;

  console.log("CocktailList location: ", search);

  const { data, isLoading, error } = useQuery(
    ["cocktails", search],
    getCards
  );

  if (error) return <p>Error loading data.</p>;

  const cards = data as ResponseData;

  const isNoData = cards?.data?.length === 0;

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

      {isNoData && !isLoading && (
        <div className="rest-filter">
          <h3 className="emty-data">No data available for this request</h3>
        </div>
      )}
      <PageSwitcher metaData={cards?.meta || null} />
      <Outlet />
    </>
  );
}

export default CocktailList;
