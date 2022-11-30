import React, { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { filterMovies, findOnlyShortMovies } from "../../utils/SearchFilter";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import screenWidth from "../../utils/getBroserWidth";

export function Movies({ savedMovies, setSavedMovies, logOut }) {
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  let cardsPerPage = isMobile ? 5 : 7;
  const [next, setNext] = useState(cardsPerPage);
  const [arrayForHoldingCards, setArrayForHoldingCards] = useState([]);
 
  const cardsToShow = arrayForHoldingCards.slice(0, next);
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resMessage, setResMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const width = screenWidth();
  const queryData = JSON.parse(sessionStorage.getItem("queryData")) || [];
  let allMovies = sessionStorage.getItem("allMoviesData");

  useEffect(() => {
    if (width < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    console.log(width);
  }, [width]);
  let filteredShortMovies = queryData.filteredMovies || [];
  let filteredMovies = queryData.filteredMovies || [];

  useEffect(() => {
    if (queryData) {
      setSearchQuery(queryData.searchQuery);
      setShortFilmsCheck(queryData.isShortFilms);
    }
  }, []);
  useEffect(() => {
    if (!errorMessage) {
      shortFilmsCheck
        ? setArrayForHoldingCards(filteredShortMovies)
        : setArrayForHoldingCards(filteredMovies);
    }
  }, [shortFilmsCheck, errorMessage]);

  // useEffect(() => {
  //   if (queryData) {
  //     const updatedQueryData = queryData;
  //     updatedQueryData.isOnlyShortFilms = shortFilmsCheck;
  //     sessionStorage.setItem("queryData", JSON.stringify(updatedQueryData));
  //   }
  // }, [shortFilmsCheck, queryData]);
  useEffect(() => {
    window.addEventListener("beforeunload", removeAllMoviesData);
    return () => {
      window.removeEventListener("beforeunload", removeAllMoviesData);
    };
  }, []);

  const removeAllMoviesData = () => sessionStorage.removeItem("allMoviesData");

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
  async function searchHandler(searchQuery, isShortFilms) {
    try {
      setLoading(true);
      if (!allMovies) {
        const allMoviesData = await moviesApi.getMovies();
        sessionStorage.setItem("allMoviesData", JSON.stringify(allMoviesData));
        allMovies = sessionStorage.getItem("allMoviesData");
      }
      filteredMovies = filterMovies(searchQuery, JSON.parse(allMovies));
      filteredShortMovies = findOnlyShortMovies(filteredMovies);
      const queryData = {
        filteredMovies,
        filteredShortMovies,
        searchQuery,
        isShortFilms,
      };
      sessionStorage.setItem("queryData", JSON.stringify(queryData));
      if (searchQuery.length === 0) {
        setResMessage("запрос не может быть пустым");
      }

      if (isShortFilms) {
        setArrayForHoldingCards(filteredShortMovies);
        setResMessage("");
        if (filteredShortMovies.length === 0) {
          setResMessage("Ничего не найдено");
        }
      } else {
        setArrayForHoldingCards(filteredMovies);
        setResMessage("");
        if (filteredMovies.length === 0) {
          setResMessage("Ничего не найдено");
        }
      }

      setErrorMessage("");
      setLoading(false);
    } catch (err) {
      setErrorMessage(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
      );
      setArrayForHoldingCards([]);
      console.log(err);
      setLoading(false);
    }
  }

  const saveMovie = (movie, likeHandler) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        // после ответа добавляем новый фильм в стейт
        setSavedMovies([...savedMovies, newMovie]);
        // меняем кнопку
        likeHandler(true);
      })
      .catch((e) => {
        logOut();
        console.log(e);
      });
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
      .catch((e) => {
        logOut();
        console.log(e);
      });
  };

  return (
    <>
      <main content="content">
        <SearchForm
          searchHandler={searchHandler}
          checkbox={shortFilmsCheck}
          setCheckbox={setShortFilmsCheck}
          searchQuery={searchQuery}
        />
        {errorMessage || resMessage ? (
          <p className="movies__message">{resMessage || errorMessage}</p>
        ) : (
          <></>
        )}
        <MoviesCardList
          isSavedPage={false}
          allMovies={cardsToShow}
          isLoading={isLoading}
          MoreBtn={MoreBtn}
          onSaveHandler={saveMovie}
          onDeleteHandler={deleteMovie}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}
