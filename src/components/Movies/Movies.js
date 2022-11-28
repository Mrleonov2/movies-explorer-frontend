import React, { useEffect, useState } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { searchFilter } from "../../utils/SearchFilter";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import screenWidth from "../../utils/getBroserWidth";

export function Movies({ savedMovies, setSavedMovies }) {
  const [isLoading, setLoading] = useState(false);
  const [resMessage, setResMessage] = useState("");

  const [isMobile, setIsMobile] = useState(false);
  let cardsPerPage = isMobile ? 5 : 7;
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
    if (width < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    console.log(width);
  }, [width]);
  function updateWidth() {
    if (width < 760) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
    console.log(width);
  }
  const handleLoadMore = () => {
    setNext(next + cardsPerPage);
  };
  const MoreBtn = ({}) => {
    return (
      arrayForHoldingCards.length < cardsPerPage ||
      (arrayForHoldingCards.length > next && (
        <button className="card-list__more-btn" onClick={handleLoadMore}>
          Ещё
        </button>
      ))
    );
  };
  async function searchHandler(search) {
    moviesApi.getMovies().then((res) => {
      setLoading(true);
      let result = searchFilter(
        res,
        search.search,
        JSON.parse(search.isShortFilms)
      );
      setArrayForHoldingCards(result);
    }).then(()=>{setLoading(false)})
  }

  const saveMovie = (movie, likeHandler) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        // после ответа добавляем новый фильм в стейт
        setSavedMovies([...savedMovies, newMovie]);
        // меняем кнопку
        likeHandler(true);
      }).catch((e) => console.log(e));
  };
  const deleteMovie = (id, likeHandler) => {
    const inSavedMovies = savedMovies.find((movie) => movie.movieId === id);
    mainApi
      .removeMovie(inSavedMovies._id)
      .then(() => {
        likeHandler(false);
        // убираем удаленный фильм из стейта
        setSavedMovies((state) =>
          state.filter((m) => m._id !== inSavedMovies._id)
        );
      })
      .catch((e) => console.log(e));
  };



  return (
    <>
      <main content="content">
        <SearchForm searchHandler={searchHandler} />
        <MoviesCardList
          isSavedPage={false}
          allMovies={cardsToShow}
          isLoading={isLoading}
          MoreBtn={MoreBtn}
          onSaveHandler={saveMovie}
          onDeleteHandler={deleteMovie}
          savedMovies ={savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}
