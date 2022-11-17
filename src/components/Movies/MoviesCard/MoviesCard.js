import React, { useState } from "react";
import imgSaveFilm from "../../../images/img-save-film.svg";
import imgFilm from "../../../images/photo.jpg";
import imgDelFilm from "../../../images/img-del-film.svg";

export function MoviesCard({
  item,
  isActive,
  isSaved,
  isInactive,
  saveMovie,
  delMovie,
}) {
  const [active, setActive] = useState(false);
  const [saved, setSaved] = useState(isSaved);
  const [inactive, setInactive] = useState(isInactive);
  function saveMovie() {
    console.log(item);
    setActive(!active);
    // if(active){
    //   saveMovie(item);
    // }else{
    //   delMovie(item.id);
    // }
  }

  return (
    <li className={`movies-card`}>
      {saved ? (
        <button
          className={`movies-card__btn movies-card__btn_del`}
          type="button"
          onClick={delMovie}
        ></button>
      ) : (
        <button
          className={`movies-card__btn movies-card__btn_like ${active &&
            "movies-card__btn_active"}`}
          type="button"
          onClick={saveMovie}
        ></button>
      )}

      <div className="movies-card__container">
        <h3 className="movies-card__title">{item.nameRU}</h3>
        <p className="movies-card__duration">{item.duration} минут</p>
      </div>
      <a
        className="movies-card__link"
        target="_blank"
        rel="noopener noreferrer"
        href={item.trailerLink}
      >
        <img
          className="movies-card__img"
          src={`https://api.nomoreparties.co/${item.image.url}`}
          alt="film-pic"
        />
      </a>
    </li>
  );
}
