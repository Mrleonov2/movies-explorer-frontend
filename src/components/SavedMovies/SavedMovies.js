import React, { useEffect, useState } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { searchFilter } from "../../utils/SearchFilter";
import { mainApi } from "../../utils/MainApi";
export function SavedMovies({ savedMovies ,setSavedMovies}) {
  const [moviesForRender, setMoviesForRender] = useState(savedMovies || []);

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
      .catch((e) => console.log(e));
  };

  function searchHandler(search) {
    setMoviesForRender(
      searchFilter(
        moviesForRender,
        search.search,
        JSON.parse(search.isShortFilms)
      )
    );
  }

  return (
    <>
      <main className="content">
        <SearchForm searchHandler={searchHandler} />
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
