import React, { useState } from "react";
import imgSaveFilm from "../../../images/img-save-film.svg";
import imgFilm from "../../../images/photo.jpg";
import imgDelFilm from "../../../images/img-del-film.svg";

export function MoviesCard({ isActive, isDeleted, isInactive }) {
  const [active, setActive] = useState(true);
  const [deleted, setDeleted] = useState(isDeleted);
  const [inactive, setInactive] = useState(false);

  return (
    <li className="movies-card">
      {(inactive && (
        <button className="movies-card__btn-container" type="button"></button>
      )) ||
        (active && (
          <button className="movies-card__btn-container" type="button">
            <img src={imgSaveFilm} alt="saved" className="movies-card__btn" />
          </button>
        )) ||
        (deleted && (
          <button className="movies-card__btn-container" type="button">
            <img src={imgDelFilm} alt="delete" className="movies-card__btn" />
          </button>
        ))}
      <div className="movies-card__container">
        <h3 className="movies-card__title">В погоне за Бэнкси</h3>
        <p className="movies-card__duration">27 минут</p>
      </div>
      <img className="movies-card__img" src={imgFilm} alt="film-pic" />
    </li>
  );
}
