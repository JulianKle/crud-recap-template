// FavoriteButton.js
import React from "react";
import Icon from "../../public/heart.svg";

export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button onClick={onClick}>
      <Icon width={25} height={25} fill={isFavorite ? "#FF0000" : "#CCCCCC"} />
    </button>
  );
}
