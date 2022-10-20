import React from "react";
import { SearchForm } from "../Movies/SearchForm/SearchForm";
import { Preloader } from "../Movies/Preloader/Preloader";
import { MoviesCardList } from "../Movies/MoviesCardList/MoviesCardList";
import { Footer } from "../Footer/Footer";
export function Movies() {
  return (
    <>
      <main content="content">
        <SearchForm />
        <MoviesCardList isActive={false}/>
        {/* <Preloader /> */}
      </main>
      <Footer />
    </>
  );
}
