import { IngredientPrewData } from "../interfaces";
import "./IngredientCard.css";
import { useLocation, useNavigate } from "react-router-dom";

interface CardProps {
  data: IngredientPrewData;
}

function IngredientCard({ data }: CardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { search } = location;

  const { type, imageUrl, name, id } = data;

  const handleCardClick = () => {
    navigate(`${id}/${search}`);
  };

  return (
    <div
      className="ingredient-card-preview card-preview"
      onClick={handleCardClick}
    >
      {imageUrl && (
        <div className="image">
          <img src={imageUrl} alt={name} />
        </div>
      )}
      <h4>{name}</h4>
      {type && <span className="category">{type}</span>}
    </div>
  );
}

export default IngredientCard;
