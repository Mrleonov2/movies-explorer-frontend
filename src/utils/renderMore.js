const wrapper = document.querySelector(".card-list__movies")
const showMoreButton = document.querySelector(".card-list__more-btn");
function nextOpen(wrapper, button){

  const limit = 7; //Сколько показывать и прогужать по кликку по книопке
  const boxs = wrapper.querySelectorAll(".movies-card"),
    len = boxs.length - 1,
    endBox = wrapper.querySelector(".movies-card_hidden"),
    index = [...boxs].indexOf(endBox) + limit;
  if (endBox) endBox.classList.remove("movies-card_hidden");
  if (index < len) boxs[index].classList.add("movies-card_hidden");
  else button.remove();
};