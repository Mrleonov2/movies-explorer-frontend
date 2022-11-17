import React, { useEffect, useState } from "react";

export function SearchForm({ searchMovie }) {
  const [values, setValues] = React.useState({
    isShortFilms: false,
    search: "",
  });

  useEffect(() => {
    setValues({
      search: sessionStorage.savedResult || "",
      isShortFilms:  JSON.parse(sessionStorage.switchState || false) ,
    });
 



  }, []);

  function handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    console.log(values);
  }

  function handleSubmit(event) {
    sessionStorage.savedResult = values.search;
    sessionStorage.switchState = values.isShortFilms;
    console.log(sessionStorage);
    searchMovie(values)
  }

  return (
    <section className="search-section">
      <div className="search-form-container">
        <form name="form-film" className="search-form">
          <input
            className="search-input"
            type="search"
            name="search"
            placeholder="Фильм"
            value={values.search}
            onChange={handleChange}
            required
          />
        </form>
        <button className="search-btn" type="button" onClick={handleSubmit}>
          Найти
        </button>
      </div>
      <div>
        <label className="search-switch-container">
          <input
            className="search-switch"
            type="checkbox"
            name="isShortFilms"
            onChange={handleChange}
            checked={values.isShortFilms}
          />
          <span className="search-circle"></span>
        </label>
        <p className="search-para">Короткометражки</p>
      </div>
    </section>
  );
}
