import React, { useEffect, useState } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
import { searchFilter } from "../../utils/SearchFilter";

export function SavedMovies({ savedMovies }) {

  const [moviesForRender, setMoviesForRender] = useState(savedMovies || []);
 
useEffect(()=>{setMoviesForRender(savedMovies)},[savedMovies])
function searchHandler(search) {
  setMoviesForRender(searchFilter(moviesForRender,search.search,JSON.parse(search.isShortFilms)))
}
  return (
    <>
      <main className="content">
        <SearchForm searchHandler={searchHandler}/>
        <MoviesCardList
          isSavedPage={true}
          allMovies={setMoviesForRender}
        />
      </main>
      <Footer />
    </>
  );
}
