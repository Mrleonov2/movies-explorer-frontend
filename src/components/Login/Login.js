import { Link } from "react-router-dom";
import headerLogo from "../../images/headerLogo.svg";
import React from "react";
export function Login() {
  return (
    <>
      <main className="register">
        <div className="register__container">
          <Link to="/" className="register__logo">
            <img              
              src={headerLogo}
              alt="логотип проекта Movie-Explorer"
            />
          </Link>
          <h2 className="register__title">Рады видеть!</h2>
          <div className="register__input-container">
            <label className="register__input-title" for="register__input-email">E-mail
            <input required className="register__input" type="text" id="register__input-email"/>
            </label>
          </div>
          <div className="register__input-container">
            <label className="register__input-title">Пароль
            <input required type="password" className="register__input"/>
            </label>
          </div>
          <div className="register__input-error" type="text">
              Что-то пошло не так...
            </div>
        <div className="login__container">
          <button className="register__submit-btn" type="submit">Войти</button>
          <div className="register__btn-container">
            <div className="register__log-in">Ещё не зарегистрированы?</div>
            <Link to="/signup" className="register__log-in-btn">
              Регистрация
            </Link>
          </div>
        </div>
        </div>
      </main>
    </>
  );
}
