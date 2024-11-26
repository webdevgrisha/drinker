import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./CocktailModalWindow.css";
import getCotails from "@/services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import classNames from "classnames";
import { CocktailData, IngredientData } from "../interfaces";
import useIsLiked from "@/hooks/useLiked";

async function getCard({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getCotails(`/cocktails/${search}`);

  return response;
}

function CocktailModalWindow() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const mainPath = pathname.split("/")[1];

  console.log("CocktailModalWindow location: ", location);
  const { id } = useParams();
  const { isLiked, toggleLike } = useIsLiked(String(id));

  console.log("location: ", location);

  const { data, isLoading, error } = useQuery([id || ""], getCard);

  if (id === undefined) return null;

  if (error) return <p>Error loading data.</p>;

  if (isLoading) return <Loader />;

  const cocktailData = data?.data as CocktailData;

  const {
    alcoholic,
    category,
    glass,
    imageUrl,
    instructions,
    name,
    ingredients,
  } = cocktailData || {};

  const closeFunc = () => {
    navigate(`/${mainPath}${search}`);
  };

  const handleLikedStateChange = () => {
    toggleLike();
  };

  const cardClasses = classNames({
    "cocktail-card": true,
    "modal-window-card": true,
    hide: isLoading,
  });

  const buttonText = isLiked ? "Remove form" : "Add to";

  return (
    <div className="coktail-modal-window modal-window-wrapper">
      {isLoading && <Loader />}
      <Card className={cardClasses}>
        <CardHeader className="section header">
          <div className="cocktail-img">
            <img src={imageUrl} alt={name} />
          </div>
          <CardTitle className="title">{name}</CardTitle>
          <button className="close-btn" onClick={closeFunc}></button>
        </CardHeader>
        <CardContent className="section modal-window-content cocktail-info ">
          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul className="list">
              {ingredients.map((ingredient) => {
                const { name, measure } = ingredient;
                const measureStr = measure ? `- ${measure}` : measure;

                return (
                  <li key={name}>
                    {name} <i>{measureStr}</i>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="instruction">
            <h4>Method</h4>
            <p>{instructions}</p>
          </div>
          <div className="additional-info">
            <h4>Additional Info</h4>
            <div className="more-info cocktail-additional-info">
              <p>
                <b>Category:</b> {category}
              </p>
              <p>
                <b>Glass:</b> {glass}
              </p>
              <p>
                <b>Alcoholic:</b> {alcoholic ? "Yes" : "No"}
              </p>
            </div>
            <div className="ingredients-additional-info">
              {ingredients.map((ingredient) => {
                const { name, imageUrl } = ingredient;

                if (!(name && imageUrl)) return null;

                return <IngredientView key={name} {...ingredient} />;
              })}
            </div>
          </div>
        </CardContent>
        <CardFooter className="section footer">
          <button onClick={handleLikedStateChange}>
            {buttonText} favourites
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

function IngredientView(data: IngredientData) {
  const { imageUrl, name } = data;

  return (
    <Card className="ingredient-card">
      <CardTitle className="name">{name}</CardTitle>
      <div className="ingredient-img">
        {<img src={imageUrl || ""} alt={name} />}
      </div>
    </Card>
  );
}

export default CocktailModalWindow;
