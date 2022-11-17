import React, { useState } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";

export function SavedMovies({ loggedIn, movies ,searchMovie}) {
  return (
    <>
      <main className="content">
        <SearchForm searchMovie={searchMovie}/>
        <MoviesCardList
          isSaved={true}
          isInactive={false}
          savedMovies={movies}
        />
      </main>
      <Footer />
    </>
  );
}
