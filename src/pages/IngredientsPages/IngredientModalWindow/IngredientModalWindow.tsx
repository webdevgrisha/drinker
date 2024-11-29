import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "../../style/MainCocktailModalWindow.css";
import "./IngredientModalWindow.css";
import getCotails from "@/services/cotails-api";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader/Loader";
import classNames from "classnames";
import { IngredientData } from "../interfaces";

async function getCard({ queryKey }: { queryKey: [string] }) {
  const [search] = queryKey;
  const response = await getCotails(`/ingredients/${search}`);

  return response;
}

function IngredientModalWindow() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const mainPath = pathname.split("/")[1];

  const { id } = useParams();

  const { data, isLoading, error } = useQuery([id || ""], getCard);

  if (id === undefined) return null;

  if (error) return <p>Error loading data.</p>;

  if (isLoading) return <Loader />;

  const ingredientData = data?.data as IngredientData;

  const { alcohol, description, imageUrl, name, percentage, type } =
    ingredientData || {};

  const closeFunc = () => {
    navigate(`/${mainPath}${search}`);
  };

  const handleIngredientFilter = () => {
    navigate(`/cocktails?ingredientId=${id}`);
  };

  const cardClasses = classNames({
    "ingredient": true,
    "modal-window-card": true,
    "hide": isLoading,
  });

  return (
    <div className="modal-window-wrapper ingredient-modal-window">
      {isLoading && <Loader />}
      <Card className={cardClasses}>
        <CardHeader className="section header ingredient-header">
          {imageUrl && (
            <div className="ingredient-img">
              <img src={imageUrl} alt={name} />
            </div>
          )}
          <CardTitle className="title">{name}</CardTitle>
          <button className="close-btn" onClick={closeFunc}></button>
        </CardHeader>
        {(description || type || alcohol || percentage) && (
          <CardContent className="section modal-window-content ingredient-content ">
            {description && (
              <div className="description">
                <h4>Description</h4>
                <p>{description}</p>
              </div>
            )}

            {description && (type || alcohol || percentage) && (
              <hr className="line" />
            )}
            {(type || alcohol || percentage) && (
              <div className="additional-info">
                <h4>Additional Info</h4>
                <div className="more-info ingredient-more-info">
                  {type && (
                    <p>
                      <b>Category:</b> {type}
                    </p>
                  )}
                  {alcohol && (
                    <p>
                      <b>Alcohol:</b> {alcohol ? "Yes" : "No"}
                    </p>
                  )}
                  {percentage && (
                    <p>
                      <b>Percentage:</b> {percentage}
                    </p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        )}
        <CardFooter className="section footer ingredient-footer">
          <button onClick={handleIngredientFilter}>
            Filter by this ingredient
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default IngredientModalWindow;
