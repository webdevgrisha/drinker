import "./CocktailCard.css";
import { CocktailPrewData } from "../../../components/interfaces";
import { SVG_Heart } from "@/assets";
import { useState } from "react";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";
import useIsLiked from "@/hooks/useLiked";

interface CardProps {
  data: CocktailPrewData;
}

function CocktailCard({ data }: CardProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const { search } = location;

  const { category, imageUrl, name, id } = data;

  const [showHeart, setShowHeart] = useState<boolean>(false);
  const { isLiked, toggleLike } = useIsLiked(id.toString());

  const handleMouseEnter = () => setShowHeart(true);

  const handleMouseLeave = () => setShowHeart(false);

  const handleCardClick = () => {
    navigate(`${id}/${search}`);
  };

  const heartClasses = classNames({
    heart: true,
    hide: !showHeart,
    liked: !!isLiked,
  });

  const handleHeartClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    toggleLike();
  };

  return (
    <div
      className="card-preview"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      <div className="image">
        <img src={imageUrl} alt={name} />
      </div>
      <h4>{name}</h4>
      <span className="category">{category}</span>

      <span className={heartClasses} onClick={handleHeartClick}>
        <SVG_Heart />
      </span>
    </div>
  );
}

export default CocktailCard;
