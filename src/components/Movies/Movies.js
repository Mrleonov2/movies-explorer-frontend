import React, { useEffect, useState } from "react";
import { SearchForm } from "./SearchForm/SearchForm";
import { MoviesCardList } from "./MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { filterMovies, findOnlyShortMovies } from "../../utils/SearchFilter";
import { moviesApi } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import useGetBroserWidth from "../../hooks/getBroserWidth";
import {
  DEFAULT_SERVER_ERROR,
  MOBILE_RENDER_CARDS,
  LAPTOP_RENDER_CARDS,
  NOT_FOUND_MESSAGE
} from "../../utils/constants";

export function Movies({ savedMovies, setSavedMovies, logOut }) {
  const [arrayForHoldingCards, setArrayForHoldingCards] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  let cardsPerPage = isMobile ? MOBILE_RENDER_CARDS : LAPTOP_RENDER_CARDS;
  const [next, setNext] = useState(cardsPerPage);
  let cardsToShow = arrayForHoldingCards.slice(0, next);
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resMessage, setResMessage] = useState("");
  const width = useGetBroserWidth();
  const queryData = sessionStorage.getItem("queryData");
  let allMovies = sessionStorage.getItem("allMoviesData");
 
  useEffect(() => {
    if (width < 760) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    console.log(width);
  }, [width]);
  let filteredShortMovies = JSON.parse(queryData)?.filteredShortMovies || [];
  let filteredMovies = JSON.parse(queryData)?.filteredMovies || [];

  useEffect(() => {
    if (queryData) {
      setSearchQuery(JSON.parse(queryData)?.searchQuery);
      setShortFilmsCheck(JSON.parse(queryData)?.isShortFilms);
    }
  }, []);
  useEffect(() => {
    if (queryData) {
      const updatedQueryData = JSON.parse(queryData);
      updatedQueryData.isShortFilms = shortFilmsCheck;
      sessionStorage.setItem("queryData", JSON.stringify(updatedQueryData));
    }
  }, [shortFilmsCheck, queryData]);
  useEffect(() => {
    if (!errorMessage) {
      shortFilmsCheck
        ? setArrayForHoldingCards(filteredShortMovies) : setArrayForHoldingCards(filteredMovies);
    }
  }, [shortFilmsCheck]);

  
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
          ??????
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
        isShortFilms:isShortFilms,
      };
      sessionStorage.setItem("queryData", JSON.stringify(queryData));
      if (isShortFilms) {
        setArrayForHoldingCards(filteredShortMovies);
        setResMessage("");
        if (filteredShortMovies.length === 0) {
          setResMessage(NOT_FOUND_MESSAGE);
        }
      } else {
        setArrayForHoldingCards(filteredMovies);
        setResMessage("");
        if (filteredMovies.length === 0) {
          setResMessage(NOT_FOUND_MESSAGE);
        }
      }

      setErrorMessage("");
      setLoading(false);
    } catch (err) {
      setErrorMessage(DEFAULT_SERVER_ERROR);
      setArrayForHoldingCards([]);
      console.log(err);
      setLoading(false);
    }
  }

  const saveMovie = (movie, likeHandler) => {
    mainApi
      .saveMovie(movie)
      .then((newMovie) => {
        // ?????????? ???????????? ?????????????????? ?????????? ?????????? ?? ??????????
        setSavedMovies([...savedMovies, newMovie]);
        // ???????????? ????????????
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
        // ?????????????? ?????????????????? ?????????? ???? ????????????
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
          isLoading={isLoading}
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
