import React, { useEffect,useState } from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";

export function MoviesCardList({
  isSavedPage,
  allMovies,
  isLoading,
  MoreBtn,
  savedMovies
}) {
  return (
    <section className="card-list__section">
      <ul
        className={`card-list ${
          isSavedPage ? "card-list__saved" : "card-list__movies"
        }`}
      >
        {allMovies &&
          allMovies.map((card, ind) => (
            <MoviesCard
              item={card}
              key={ind}
              isSavedPage={isSavedPage}
              movId={card.id}
              savedMovies={savedMovies}
            />
          ))}
        {isLoading && <Preloader />}
        {/* <h2>Ничего не найдено</h2> */}
      </ul>
      <div className="card-list__more">
        {!isSavedPage && (
            <MoreBtn/>
          )}
      </div>
    </section>
  );
}
