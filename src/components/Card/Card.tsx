import "./Card.css";
import { CoctailData } from "../interfaces";

interface CardProps {
  data: CoctailData;
}

function Card({ data }: CardProps) {
  const { alcoholic, category, glass, imageUrl, instructions, name } = data;
  return (
    <div className="card-preview">
      <div className="image">
        <img src={imageUrl} alt={name} />
      </div>
      <h4>{name}</h4>
      <span className="category">{category}</span>
    </div>
  );
}

export default Card;
