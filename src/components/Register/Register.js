import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";
import React from "react";
export function Register() {
  return (
    <section className="register">
      <div className="register__container">
        <Link to="/" className="register__logo">
          <img src={headerLogo} alt="логотип проекта Movie-Explorer" />
        </Link>
        <h2 className="register__title">Добро пожаловать!</h2>

        <div className="register__input-list">
          <div className="register__input-container">
            <label className="register__input-title">
              Имя
              <input required className="register__input" type="text" />
            </label>
          </div>
          <div className="register__input-container">
            <label className="register__input-title">
              E-mail
              <input required className="register__input" type="email" />
            </label>
          </div>
          <div className="register__input-container">
            <label className="register__input-title">
              Пароль
              <input
                required
                type="password"
                className="register__input register__input_error"
              />
            </label>
          </div>
          <div className="register__input-error" type="text">
            Что-то пошло не так...
          </div>
        </div>
        <button className="register__submit-btn" type="submit">
          Зарегистрироваться
        </button>
        <div className="register__btn-container">
          <div className="register__log-in">Уже зарегистрированы?</div>
          <Link to="/signin" className="register__log-in-btn">
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}
