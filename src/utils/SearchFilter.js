export const searchFilter = (movies, searchQuery, isShort = false) => {
  let filterRes = movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  });
  if (isShort) {
    filterRes = filterRes.filter((item) => {
      return item.duration <= 40;
    });
  }

  return filterRes;
};

export const filterMovies = (searchQuery, moviesArray) => {
  return moviesArray.filter((movie) =>
    movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

export const findOnlyShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration <= 40);
};
