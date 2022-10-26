import React, { useState } from "react";

export function SearchForm() {
  const [shortFilms, setShortFilms] = useState(false);

  function clickButton() {
    setShortFilms(!shortFilms);
  }

  return (
    <section className="search-section">
      <div className="search-form-container">
 
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
        </div>
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
