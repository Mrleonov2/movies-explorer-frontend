import React from "react";

export function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__para">Портфолио</p>
      <ul className="portfolio__list">
        <li className="portofolio__item">
          <a
            href="https://github.com/Mrleonov2/how-to-learn"
            alt="static"
            className="portofolio__item-link"
          >
            <h4 className="portofolio__item-header">Статичный сайт</h4>

            <div className="portfolio__img"></div>
          </a>
        </li>
        <li className="portofolio__item">
          <a
            href="https://github.com/Mrleonov2/russian-travel"
            alt="static"
            target="_blank"
            rel="noopener noreferrer"
            className="portofolio__item-link"
          >
            <h4 className="portofolio__item-header">Адаптивный сайт</h4>

            <div className="portfolio__img"></div>
          </a>
        </li>
        <li className="portofolio__item">
          <a
            href="https://github.com/Mrleonov2/react-mesto-api-full"
            alt="static"
            target="_blank"
            rel="noopener noreferrer"
            className="portofolio__item-link"
          >
            <h4 className="portofolio__item-header">
              Одностраничное приложение
            </h4>

            <div className="portfolio__img"></div>
          </a>
        </li>
      </ul>
    </section>
  );
}
