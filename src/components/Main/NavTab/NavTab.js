import React from "react";
import { Link } from "react-router-dom";

export function NavTab() {
  return (
    <section className="navtab">
      <ul className="navtab__list">
        <li>
          <a href="#about" className="navtab__link">
            О проекте
          </a>
        </li>
        <li>
          <a href="#techs" className="navtab__link navtab__link_margin">
            Технологии
          </a>
        </li>
        <li>
          <a href="#about-me " className="navtab__link">
            Студент
          </a>
        </li>
      </ul>
    </section>
  );
}
