import React, { useState } from "react";

export function SearchForm() {
  const [shortFilms, setShortFilms] = useState(false);

  function clickButton() {
    setShortFilms(!shortFilms);
  }

  return (
    <section className="search-section">
   <form className="search-form">
        <input
          className="search-input"
          type="text"
          name="film"
          placeholder="Фильм"
          required
        />
        <button className="search-btn" type="submit">
          Найти
        </button>
        </form>

      <div className="search-switch-container">
        <button
          className={`search-switch ${shortFilms ? "" : "search-switch_start"}`}
          onClick={clickButton}
          type="button">
          <div className="search-circle"></div>
        </button>
        <h3 className="search-para">Короткометражки</h3>
      </div>
    </section>
  );
}
