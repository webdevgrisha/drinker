import "./CardList.css";
import { CocktailPrewData, ResponseData } from "../interfaces";
import getCotails from "../../services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import PageSwitcher from "../PageSwitcher/PageSwitcher";
import Loader from "../Loader/Loader";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";

async function getCards({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getCotails(`/cocktails/${search}`);

  return response;
}

function CardList() {
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
            return (
              <Card
                key={cocktailData.id}
                data={cocktailData}
              />
            );
          })}
        </div>
      )}
      <PageSwitcher metaData={cards?.meta || null} />
      <Outlet />
    </>
  );
}

export default CardList;
