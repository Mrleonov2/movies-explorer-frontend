import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import React, { useState ,useEffect} from "react";

export function MoviesCard({
  item,
  isSavedPage,
  onDeleteHandler,
  onSaveHandler,
  savedMovies
}) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    // окрашиваем кнопку лайка, если он фильм нашелся в сохраненных
    if (savedMovies.some((movie) => movie.movieId === item.id)) {
      setActive(true);
    }
  }, [savedMovies, item.id]);

 
  const handleSave = () => {
console.log(item)
    onSaveHandler(item, setActive);
  };

  const handleDelete = () => {
    // условие для удаления с обоих страниц
    // так как ключи в объектах отличаются
    onDeleteHandler(item._id || item.id, setActive);
  };


  return (
    <li className={`movies-card`}>
      {isSavedPage ? (
        <button
          className={`movies-card__btn movies-card__btn_del`}
          type="button"
          onClick={handleDelete}
        ></button>
      ) : (
        <button
          className={`movies-card__btn movies-card__btn_like ${active &&
            "movies-card__btn_active"}`}
          type="button"
          onClick={active ? handleDelete : handleSave}
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
          src={isSavedPage ? `${item.image}`: `https://api.nomoreparties.co/${item.image.url}`}
          alt="film-pic"
        />
      </a>
    </li>
  );
}
