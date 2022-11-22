function searchFilter(arrayData, searchQuery, isShort = false) {
  let filterRes = arrayData.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase());
  });
  if (isShort) {
    filterRes = filterRes.filter((item) => {
      return item.duration <= 40;
    });
  }

  return filterRes;
}

export { searchFilter };
