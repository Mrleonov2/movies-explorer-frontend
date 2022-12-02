const BASE_URL = "https://api.explorer.leonov.nomoredomains.club";
const MOVIES_URL = "https://api.nomoreparties.co/beatfilm-movies";
const emailValid =
  "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$";
const MAX_DURATION_SHORT_FILM = 40;
const LAPTOP_WIDTH = 760;
const DEFAULT_SERVER_ERROR =
  "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз";
const MOBILE_RENDER_CARDS = 5;
const LAPTOP_RENDER_CARDS = 7;
const NOT_FOUND_MESSAGE = "Ничего не найдено";

export {
  BASE_URL,
  MOVIES_URL,
  emailValid,
  MAX_DURATION_SHORT_FILM,
  LAPTOP_WIDTH,
  DEFAULT_SERVER_ERROR,
  LAPTOP_RENDER_CARDS,
  MOBILE_RENDER_CARDS,
  NOT_FOUND_MESSAGE
};
