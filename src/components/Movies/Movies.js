import React, { useEffect, useState } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { searchFilter } from "../../utils/SearchFilter";
import { moviesApi } from "../../utils/MoviesApi";
import screenWidth from "../../utils/getBroserWidth";
export function Movies({ savedMovies, setSavedMovies }) {
  const [isLoading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");
  const cardsPerPage = isMobile ? 5 : 7;
  const [isMobile, setIsMobile] = useState(false);
  const [next, setNext] = useState(cardsPerPage);
  const [arrayForHoldingCards, setArrayForHoldingCards] = useState(
    savedMovies || []
  );
  const width = screenWidth();
  const cardsToShow = arrayForHoldingCards.slice(0, next);
  let allMovies = localStorage.getItem("allMoviesData");
  useEffect(() => {
    setArrayForHoldingCards(savedMovies);
  }, []);

  useEffect(() => {
    updateWidth();
  }, [width]);
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
  const MoreBtn = ({}) => {
    return (
      <button className="card-list__more-btn" onClick={handleLoadMore}>
        Ещё
      </button>
    );
  };
  function searchHandler(search) {
    moviesApi.getMovies().then((res) => {
      setArrayForHoldingCards(res);
    });

    // setArrayForHoldingCards(
    //   searchFilter(res, search.search, JSON.parse(search.isShortFilms))
    // );
  }
  return (
    <>
      <main content="content">
        <SearchForm searchHandler={searchHandler} />
        <MoviesCardList
          isSavedPage={false}
          allMovies={arrayForHoldingCards}
          isLoading={isLoading}
          MoreBtn={MoreBtn}
        />
      </main>
      <Footer />
    </>
  );
}
