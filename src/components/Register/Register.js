import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";
import React, { useCallback, useState } from "react";
import { emailValid } from "../../utils/constants";
export function Register({ onRegister, isLoading }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }
    console.log(values);
    onRegister(values);
  };
  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  return (
    <section className="register">
      <form
        className="register__container"
        name="register"
        onSubmit={handleSubmit}
      >
        <Link to="/" className="register__logo">
          <img src={headerLogo} alt="логотип проекта Movie-Explorer" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>
        <div className="register__input-list">
          <div className="register__input-container">
            <label className="register__input-title">
              Имя
              <input
                className="register__input"
                type="text"
                id="register__input-name"
                placeholder="Имя"
                name="name"
                value={values.name || ""}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
            <div className="register__input-error">{errors.name}</div>
          </div>
          <div className="register__input-container">
            <label className="register__input-title">
              E-mail
              <input
                className="register__input"
                type="email"
                name="email"
                id="register__input-email"
                placeholder="Электронная почта"
                value={values.email || ""}
                pattern={emailValid}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
            <div className="register__input-error">{errors.email}</div>
          </div>
          <div className="register__input-container">
            <label className="register__input-title">
              Пароль
              <input
                className="register__input"
                id="register__input-password"
                placeholder="Пароль"
                type="password"
                name="password"
                value={values.password || ""}
                onChange={handleChange}
                disabled={isLoading}
                required
              />
            </label>
            <div className="register__input-error">{errors.password}</div>
          </div>
        </div>
        <button
          className="register__submit-btn"
          type="submit"
          disabled={!isValid || isLoading}
        >
          Зарегистрироваться
        </button>
        <div className="register__btn-container">
          <div className="register__log-in">Уже зарегистрированы?</div>
          <Link to="/signin" className="register__log-in-btn">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}
