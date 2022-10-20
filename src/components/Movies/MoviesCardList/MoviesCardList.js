import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList({ isActive, isDeleted }) {
  return (
    <section className="card-list__section">
      <ul className="card-list">
        <MoviesCard isDeleted ={isDeleted} isActive={isActive}/>
      </ul>
      <div className="card-list__more">
        <button className="card-list__more-btn">Ещё</button>
      </div>
    </section>
  );
}
