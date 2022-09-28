import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList() {
  return (
    <section className="card-list__section">
      <ul className="card-list">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <div className="card-list__more">
        <button className="card-list__more-btn">Ещё</button>
      </div>
    </section>
  );
}
