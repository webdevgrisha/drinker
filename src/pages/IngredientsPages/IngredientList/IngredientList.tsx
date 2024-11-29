import "../../style/CardList.css";
import "./IngredientList.css";
import getData from "../../../services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import PageSwitcher from "../../../components/PageSwitcher/PageSwitcher";
import Loader from "../../../components/Loader/Loader";
import { Outlet, useLocation } from "react-router-dom";
import IngredientCard from "../IngredientCard/IngredientCard";
import { ResponseData } from "../interfaces";
import useCustomSearchParams from "@/hooks/useCustomSearchParams";
import { Button } from "@/components/ui/button";

async function getCards({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getData(`/ingredients/${search}`);

  return response;
}

function IngredientList() {
  const [, setSearchParams] = useCustomSearchParams();
  const location = useLocation();

  const { search } = location;

  const { data, isLoading, error } = useQuery([search], getCards, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 15 * 60 * 1000,
    enabled: !!search,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  if (error) return <p>Error loading data.</p>;

  const cards = data as ResponseData;

  const isNoData = cards?.data?.length === 0;

  const handleResetFilter = () => {
    setSearchParams({});
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-list ingredient-list">
          {cards.data.map((cocktailData) => {
            return <IngredientCard key={cocktailData.id} data={cocktailData} />;
          })}
        </div>
      )}

      {isNoData && !isLoading && (
        <div className="reset-filter">
          <h3 className="emty-data">No data available for this request</h3>
          <Button className="reset-filters-btn" onClick={handleResetFilter}>
            Reset Filter
          </Button>
        </div>
      )}
      <PageSwitcher metaData={cards?.meta || null} />
      <Outlet />
    </>
  );
}

export default IngredientList;
