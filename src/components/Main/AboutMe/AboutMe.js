import React from "react";
import photo from "../../../images/photo.jpg";

export function AboutMe() {
  return (
    <section className="about" id="about-me">
      <h2 className="about__header">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__header">Михаил</h3>
          <p className="about-me__para">20 лет</p>
          <p className="about-me__para-2">
            Я родился и живу в Новосибирске, учился в НГТУ, но выгорел и
            отчилился начал пробовать кодить и мне понравилось и хочу
            развиваться в этом направлении.
          </p>
          <ul className="about-me__list">
            <li>
              <a className="about-me__link" href="https://github.com/mrleonov2">
                Github
              </a>
            </li>
            <li>
              <a
                className="about-me__link"
                href="https://vk.com/mikhail_leonov"
              >
                VK
              </a>
            </li>
          </ul>
        </div>
        <img src={photo} className="about-me__photo" alt="user-pic" />
      </div>
    </section>
  );
}
