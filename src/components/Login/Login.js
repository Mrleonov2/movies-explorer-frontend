import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";
import React, { useCallback, useState } from "react";
export function Login({ onLogin }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    onLogin(values);
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
    <>
      <section className="register">
        <form
          className="register__container"
          name="login"
          onSubmit={handleSubmit}
        >
          <Link to="/" className="register__logo">
            <img src={headerLogo} alt="логотип проекта Movie-Explorer" />
          </Link>
          <h2 className="register__title">Рады видеть!</h2>
          <div className="register__input-container">
            <label
              className="register__input-title"
              htmlFor="login__input-email"
            >
              E-mail
              <input
                className="register__input"
                type="email"
                id="login__input-email"
                placeholder="Электронная почта"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                required
              />
            </label>
            <div className="register__input-error">{errors.email}</div>
          </div>
          <div className="register__input-container">
            <label
              className="register__input-title"
              htmlFor="login__input-password"
            >
              Пароль
              <input
                className="register__input"
                type="password"
                id="login__input-password"
                placeholder="Пароль"
                name="password"
                value={values.password || ''}
                onChange={handleChange}
                required 
                autoComplete="off"
              />
            </label>
            <div className="register__input-error">{errors.password}</div>
          </div>

          <div className="login__container">
            <button
              className="register__submit-btn"
              type="submit"
              disabled={!isValid ? true : false}
            >
              Войти
            </button>
            <div className="register__btn-container">
              <div className="register__log-in">Ещё не зарегистрированы?</div>
              <Link to="/signup" className="register__log-in-btn">
                Регистрация
              </Link>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
