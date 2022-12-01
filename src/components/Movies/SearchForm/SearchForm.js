import React, { useEffect, useState } from "react";

export function SearchForm({
  searchHandler,
  checkbox,
  setCheckbox,
  searchQuery,
  isLoading
}) {
  const [values, setValues] = useState({
    search: "",
  });
  const [errorText, setErrorText] = useState("");
  useEffect(() => {
    // отображаем последний запрос, если он есть
    if (searchQuery) {
      setValues({ ...values, search: searchQuery });
    }
  }, [searchQuery, setValues]);

  const onClickCheckBox = () => setCheckbox(!checkbox);
  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
    console.log(values);
  };

  const handleSubmit = (e) => {
    if (values.search == false) {
      setErrorText("Запрос не может быть пустым");
      return;
    }
    else{
    searchHandler(values.search, checkbox);
    setErrorText("");
  }
  };

  return (
    <section className="search-section">
      <div className="search-form-container">
        <form name="form-film" className="search-form">
          <input
            className="search-input"
            type="search"
            name="search"
            placeholder="Фильм"
            value={values.search || ""}
            onChange={handleChange}
            disabled={isLoading}
            autoComplete="off"
            required
          />
        </form>
        <button className="search-btn" type="button" onClick={handleSubmit}>
          Найти
        </button>
        <span className="search-form__error">{errorText}</span>
      </div>
      
      <div>
        <label className="search-switch-container">
          <input
            className="search-switch"
            type="checkbox"
            name="isShortFilms"
            checked={checkbox}
            onChange={onClickCheckBox}
            disabled={isLoading}
          />
          <span className="search-circle"></span>
        </label>
        <p className="search-para">Короткометражки</p>
      </div>
    </section>
  );
}
