import { MOVIES_URL} from "./constants";
class MoviesApi {
  constructor({ baseUrl}) {
    this._baseUrl = baseUrl;
  }
  _headers(){
    return{
      "Content-Type": "application/json",
    }
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
      method: "GET",
      //credentials:"include",
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
const moviesApi = new MoviesApi({
  baseUrl: MOVIES_URL,
});

export { moviesApi };


