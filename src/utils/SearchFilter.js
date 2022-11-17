function searchFilter(arrayData, search, isShort = false) {
  let searchStr = search.toLowerCase();
let filterRes = arrayData.filter((item) => {
    return `${item.nameRU} ${item.nameEN} ${item.country} ${item.director} ${item.year}`
      .toLowerCase()
      .includes(searchStr);

  });
  if (isShort) {
    filterRes = filterRes.filter((item) => {
      return item.duration <= 40;
    });
  }

  return filterRes;
}

export { searchFilter };
