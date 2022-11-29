import React, { useEffect, useState } from "react";

export function SearchForm({
  searchHandler,
  checkbox,
  setCheckbox,
  searchQuery,
}) {
  const [values, setValues] = useState({
    search: "",
  });

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

  const handleSubmit = (event) => {
    searchHandler(values.search, checkbox);
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
            checked={checkbox}
            onChange={onClickCheckBox}
          />
          <span className="search-circle"></span>
        </label>
        <p className="search-para">Короткометражки</p>
      </div>
    </section>
  );
}
