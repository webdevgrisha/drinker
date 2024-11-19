import "./Card.css";
import { CoctailData } from "../interfaces";
import { SVG_Heart } from "@/assets";
import { useState } from "react";
import classNames from "classnames";

interface CardProps {
  data: CoctailData;
}

function Card({ data }: CardProps) {
  const { category, imageUrl, name, id } = data;

  const [showHeart, setShowHeart] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<string | null>(() =>
    localStorage.getItem(id.toString())
  );

  const handleMouseEnter = () => setShowHeart(true);

  const handleMouseLeave = () => setShowHeart(false);

  const heartClasses = classNames({
    heart: true,
    hide: !showHeart,
    liked: !!isLiked,
  });

  const handleHeartClick = () => {
    const item = localStorage.getItem(id.toString());

    if (item === null) {
      localStorage.setItem(id.toString(), "true");
      setIsLiked("true");
    } else {
      delete localStorage[id.toString()];
      setIsLiked(null);
    }
  };

  return (
    <div
      className="card-preview"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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

export default Card;
