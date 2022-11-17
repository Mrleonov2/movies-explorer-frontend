import React, { useEffect } from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";

import { MoviesCardList } from "./MoviesCardList/MoviesCardList.js";
import { Footer } from "../Footer/Footer";
export function Movies({ movies, searchMovie, isLoading, change }) {
  useEffect(() => {}, []);

  return (
    <>
      <main content="content">
        <SearchForm searchMovie={searchMovie} />
        <MoviesCardList
          isInactive={true}
          movies={movies}
          isLoading={isLoading}
          change={change}
        />
      </main>
      <Footer />
    </>
  );
}
