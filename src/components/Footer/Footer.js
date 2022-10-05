import React from "react";

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__para">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__container">
        <p className="footer__copyright">© 2022</p>
        <ul className="footer__list">
          <li className="footer__list-item">
            <a className="footer__link" href="https://practicum.yandex.ru">
              Яндекс.Практикум
            </a>
          </li>
          <li className="footer__list-item footer__list-item_margin">
            <a className="footer__link" href="https://github.com/mrleonov2">
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
