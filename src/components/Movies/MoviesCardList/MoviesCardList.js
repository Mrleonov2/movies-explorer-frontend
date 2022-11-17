import React, { useEffect, useRef, useState } from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";
import { Preloader } from "../Preloader/Preloader";

const cardsPerPage = 7;
let arrayForHoldingCards = [];

export function MoviesCardList({
  isActive,
  isSaved,
  isInactive,
  movies,
  savedMovies,
  isLoading,
  change
}) {
  const [cardsToShow, setCardsToShow] = useState([]);
  const [next, setNext] = useState(cardsPerPage);
  const showBtn = useRef();


  useEffect(() => {
    setCardsToShow([])

    !isSaved && loopWithSlice(0, cardsPerPage);
  }, [movies,change]);

  const loopWithSlice = (start, end) => {
    const slicedPosts = movies.slice(start, end);
    arrayForHoldingCards = [...arrayForHoldingCards, ...slicedPosts];
    setCardsToShow(arrayForHoldingCards);
  };

  const handleShowMore = () => {
    loopWithSlice(next, next + cardsPerPage);
    setNext(next + cardsPerPage);
    if (arrayForHoldingCards.length >= movies.length || movies.length < 7) {
      showBtn.current.remove();
    }
  };

  return (
    <section className="card-list__section">
      <ul
        className={`card-list ${
          isSaved ? "card-list__saved" : "card-list__movies"
        }`}
      >
        {isSaved ? savedMovies : cardsToShow.map((el, i) => (
          <MoviesCard
            item={el}
            key={i}
            isSaved={isSaved}
            isActive={isActive}
            isInactive={isInactive}
          />
        ))}
        {isLoading && <Preloader />}
        <h2>Ничего не найдено</h2>
      </ul>
      <div className="card-list__more">
        {!isSaved && (
          <button
            className="card-list__more-btn"
            onClick={handleShowMore}
            ref={showBtn}
          >
            Ещё
          </button>
        )}
      </div>
    </section>
  );
}
