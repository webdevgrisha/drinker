import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./CocktailsModalWindow.css";
import getCotails from "@/services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import classNames from "classnames";
import { CocktailData, IngredientData } from "../interfaces";
import { SVG_Arrow } from "@/assets";
import useIsLiked from "@/hooks/useLiked";

async function getCard({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getCotails(`/cocktails/${search}`);

  return response;
}

function CocktailsModalWindow() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { id } = useParams();
  const { isLiked, toggleLike } = useIsLiked(String(id));

  console.log("location: ", location);
  if (id === undefined) return null;

  const { data, isLoading, error } = useQuery([id], getCard);

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
    navigate(`/cocktails/${search}`);
  };

  const handleLikedStateChange = () => {
    toggleLike();
  };

  const cardClasses = classNames({ "cocktail-card": true, hide: isLoading });

  const buttonText = isLiked ? "Remove form" : "Add to";

  return (
    <div className="cocktail-wrapper">
      {isLoading && <Loader />}
      <Card className={cardClasses}>
        <CardHeader className="header">
          <div className="cocktail-img">
            <img src={imageUrl} alt={name} />
          </div>
          <div className="info-wrapper">
            <CardTitle className="title">{name}</CardTitle>
            <CardDescription className="category">{category}</CardDescription>
            <p>
              <b>Instructions:</b> {instructions}
            </p>
            <p>
              <b>Glass:</b> {glass}
            </p>
            <p>
              <b>Alcoholic:</b> {alcoholic ? "Yes" : "No"}
            </p>
          </div>
          <button className="close-btn" onClick={closeFunc}></button>
        </CardHeader>
        <CardContent className="ingredients-container">
          {ingredients.map((ingredient, index) => {
            const isLast = index === ingredients.length - 1;
            return (
              <>
                <IngredientView {...ingredient} />
                {!isLast && <SVG_Arrow />}
              </>
            );
          })}
        </CardContent>
        <CardFooter className="footer">
          <button onClick={handleLikedStateChange}>
            {buttonText} favourites
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

function IngredientView(data: IngredientData) {
  const { imageUrl, measure, name, type } = data;

  const imgClass = classNames({ "ingredient-img": true, hide: !imageUrl });

  return (
    <Card className="ingredient-card">
      <CardHeader>
        <CardTitle className="name">{name}</CardTitle>
        <CardDescription className="category">{type}</CardDescription>
      </CardHeader>
      <CardContent className={imgClass}>
        {<img src={imageUrl || ""} alt={name} />}
      </CardContent>
      {measure && (
        <CardFooter>
          <p className="measure">{measure}</p>
        </CardFooter>
      )}
    </Card>
  );
}

export default CocktailsModalWindow;
