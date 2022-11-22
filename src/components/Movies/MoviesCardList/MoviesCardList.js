import React, { useEffect, useRef, useState } from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";
import screenWidth from "../../../utils/getBroserWidth";

export function MoviesCardList({
  isActive,
  isSaved,
  isInactive,
  movies,
  savedMovies,
  isLoading,
  change,
}) {
  const cardsPerPage = isMobile ? 5 : 7;
  const [isMobile, setIsMobile] = useState(false);
  const [next, setNext] = useState(cardsPerPage);
  const [arrayForHoldingCards, setArrayForHoldingCards] = useState(movies);
  const width = screenWidth();
  const cardsToShow = arrayForHoldingCards.slice(0, next);

  useEffect(() => {
    updateWidth();
    // setArrayForHoldingCards(movies);
  }, [cardsToShow, arrayForHoldingCards]);
  function updateWidth() {
    if (width < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }

  const handleLoadMore = () => {
    setNext(next + cardsPerPage);
  };
  return (
    <section className="card-list__section">
      <ul
        className={`card-list ${
          isSaved ? "card-list__saved" : "card-list__movies"
        }`}
      >
        {!isSaved
          ? cardsToShow.map((card, ind) => (
              <MoviesCard
                item={card}
                key={ind}
                isSaved={isSaved}
                isActive={isActive}
                isInactive={isInactive}
              />
            ))
          : ""}
        {isLoading && <Preloader />}
        {/* <h2>Ничего не найдено</h2> */}
      </ul>
      <div className="card-list__more">
        {
        arrayForHoldingCards.length > cardsPerPage &&
          next < arrayForHoldingCards.length &&
        !isSaved && (
          <button className="card-list__more-btn" onClick={handleLoadMore}>
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}
