import React, { useEffect, useState } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { searchFilter } from "../../utils/SearchFilter";
import { mainApi } from "../../utils/MainApi";
import {
  NOT_FOUND_MESSAGE
} from "../../utils/constants";
export function SavedMovies({ savedMovies, setSavedMovies, logOut }) {
  const [moviesForRender, setMoviesForRender] = useState(savedMovies || []);
  const [shortFilmsCheck, setShortFilmsCheck] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  useEffect(() => {
    setMoviesForRender(savedMovies);
  }, [savedMovies]);

  const deleteMovie = (movieId, likeHandler) => {
    mainApi
      .removeMovie(movieId)
      .then(() => {
        likeHandler(false);
        // при удалении меняем оба состояния, чтобы карточка не отобразилась
        setSavedMovies((state) => state.filter((m) => m._id !== movieId));
        setMoviesForRender((state) => state.filter((m) => m._id !== movieId));
      })
      .catch((e) => {
      console.log(e)
      logOut()
      });
  };

  function searchHandler(query, shortFilmsCheck) {
    // фильтруем
    const filteredMovies = searchFilter(savedMovies, query, shortFilmsCheck);
    if (filteredMovies.length === 0) {
      setMoviesForRender([]);
      setResultMessage(NOT_FOUND_MESSAGE);
    } else if (query.length === 0) {
      setResultMessage("Запрос не может быть пустым");
    } else {
      setMoviesForRender(filteredMovies);
      setResultMessage("");
    }
  }

  return (
    <>
      <main className="content">
        <SearchForm
          searchHandler={searchHandler}
          checkbox={shortFilmsCheck}
          setCheckbox={setShortFilmsCheck}
        />
        {resultMessage && <p className="movies__message">{resultMessage}</p>}
        <MoviesCardList
          isSavedPage={true}
          allMovies={moviesForRender}
          onDeleteHandler={deleteMovie}
          savedMovies={savedMovies}
        />
      </main>
      <Footer />
    </>
  );
}
