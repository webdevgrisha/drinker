import "./CardList.css";
import { PageData, ResponseData } from "../interfaces";
import getCotails from "../../services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import Card from "../Card/Card";
import PageSwitcher from "../PageSwitcher/PageSwitcher";
import Loader from "../Loader/Loader";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

async function getCards({ queryKey }: { queryKey: [string, string] }) {
  const [pathname, search] = queryKey;
  const response = await getCotails(pathname + search);

  return response;
}

function CardList() {
  const location = useLocation();

  const { pathname, search } = location;

  const { data, isLoading, error } = useQuery([pathname, search], getCards);

  if (error) return <p>Error loading data.</p>;

  const cards = data as ResponseData;;
  console.log("Bobr: ", cards);

  const handleCardClick = (id: number) => {
    
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="card-list">
          {cards.data.map((cocktailData) => {
            return <Card key={cocktailData.id} data={cocktailData} />;
          })}
        </div>
      )}
      <PageSwitcher metaData={cards?.meta || null}/>
    </>
  );
}

export default CardList;
