import React from "react";
import { Link } from "react-router-dom";

export function Header({ loggedIn, handlePopupClick, isHeaderMain }) {
  return (
    <header className={`header  ${isHeaderMain && "header__gray"}`}>
      <div className="header__container">
        <Link to="/" className="header__logo"></Link>
        <ul className={`header__list ${loggedIn ? "" : "header__list_hidden"}`}>
          <li className="header__list-item">
            <Link to="/movies" className="header__link">
              Фильмы
            </Link>
          </li>
          <li className="header__list-item">
            <Link to="/saved-movies" className="header__link">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
        <div
          className={`${
            loggedIn ? "header__account_hidden" : "header__account"
          }`}
        >
          <Link
            to={`${loggedIn ? "/profile" : "/signup"}`}
            className={`header__link header__link_email ${
              loggedIn ? "" : "header__link_email-m"
            } `}
          >{`${loggedIn ? "Аккаунт" : "Регистрация"}`}</Link>
          <Link
            to={`${loggedIn ? "/profile" : "/signin"}`}
            className={`header__link ${
              loggedIn ? "header__link_auth" : "header__link_login"
            }`}
          >
            {`${loggedIn ? "" : "Войти"}`}
          </Link>
        </div>
        <button
          onClick={handlePopupClick}
          className={`header__burger-menu ${loggedIn &&
            "header__burger-menu_visible"}`}
        ></button>
      </div>
    </header>
  );
}
