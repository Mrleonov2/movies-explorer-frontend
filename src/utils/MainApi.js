import { BASE_URL } from "./constants";
import { MOVIES_URL} from "./constants";
class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  _headers() {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }

  getSavedFilms() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      credentials: "include",
      headers: this._headers(),
    }).then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers(),
    }).then(this._checkResponse);
  }
  editProfile({ email, name }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers(),
      body: JSON.stringify({
        email,
        name,
      }),
    }).then(this._checkResponse);
  }
  logOut() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      credentials: "include",
      headers: this._headers(),
    }).then(this._checkResponse);
  }
  saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id
  }) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers(),
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image:'https://api.nomoreparties.co' + image.url,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail:'https://api.nomoreparties.co' + image.formats.thumbnail.url,
        movieId: id,
      }),
    }).then(this._checkResponse);
  }

  removeMovie(moviesId) {
    return fetch(`${this._baseUrl}/movies/${moviesId}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers(),
    }).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }
}
const mainApi = new MainApi({
  baseUrl: BASE_URL,
});

export { mainApi };
