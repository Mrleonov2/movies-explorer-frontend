import React from "react";
import { MoviesCard } from "../MoviesCard/MoviesCard";

export function MoviesCardList({ isActive, isDeleted ,isInactive }) {
  return (
    <section className="card-list__section">
      <ul className="card-list">
        <MoviesCard isDeleted={isDeleted} isActive={isActive} isInactive={isInactive}/>
        <MoviesCard isDeleted={isDeleted} isActive={isActive} isInactive={isInactive}/>
        <MoviesCard isDeleted={isDeleted} isActive={isActive} isInactive={isInactive}/>
      </ul>
      <div className="card-list__more">
        <button className="card-list__more-btn">Ещё</button>
      </div>
    </section>
  );
}
