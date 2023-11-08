import { configMainApi, MOVIE_IMAGE_BASE_URL } from './constants';

class MainApi {
  constructor({ BASE_URL, HEADERS, CREDENTIALS, ENDPOINTS}, { MOVIE_IMAGE_BASE_URL }) {
    this._baseUrl = BASE_URL;
    this._headers = HEADERS;
    this._credentials = CREDENTIALS;
    this._movieBaseUrl = MOVIE_IMAGE_BASE_URL;
    this._endRegister = ENDPOINTS.REGISTER;
    this._endLogin = ENDPOINTS.LOGIN;
    this._endLogout = ENDPOINTS.LOGOUT;
    this._endMovies = ENDPOINTS.MOVIES;
    this._endUser = ENDPOINTS.USER;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  register({ email, password, name }) {
    return fetch(
      `${this._baseUrl}${this._endRegister}`,
      {
        method: 'POST',
        headers: this._headers,
        credentials: this._credentials,
        body: JSON.stringify({ email, password, name })
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  };
  
  login({ email, password }) {
    return fetch(
      `${this._baseUrl}${this._endLogin}`,
      {
        method: 'POST',
        headers: this._headers,
        credentials: this._credentials,
        body: JSON.stringify({ email, password })
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  };
  
  logout() {
    return fetch(
      `${this._baseUrl}${this._endLogout}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: this._credentials,
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }
  
  getUser() {
    return fetch(
      `${this._baseUrl}${this._endUser}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: this._credentials,
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  };
  
  updateUserInfo({ name, email }) {
    return fetch(
      `${this._baseUrl}${this._endUser}`,
      {
        method: 'PATCH',
        headers: this._headers,
        credentials: this._credentials,
        body: JSON.stringify({ name, email })
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }
  
  getSavedMovie(movie) {
    return fetch(
      `${this._baseUrl}${this._endMovies}`,
      {
        method: 'POST',
        headers: this._headers,
        credentials: this._credentials,
        body: JSON.stringify({
          country: movie.country,
          director: movie.director,
          duration: movie.duration,
          year: movie.year,
          description: movie.description,
          image: `${this._movieBaseUrl}${movie.image.url}`,
          trailerLink: movie.trailerLink,
          nameRU: movie.nameRU,
          nameEN: movie.nameEN,
          thumbnail: `${this._movieBaseUrl}${movie.image.formats.thumbnail.url}`,
          movieId: movie.id,
        })
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  };
  
  
  getMovies() {
    return fetch(
      `${this._baseUrl}${this._endMovies}`,
      {
        method: 'GET',
        headers: this._headers,
        credentials: this._credentials,
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }
  
  deleteMovie(movieId) {
    return fetch(
      `${this._baseUrl}${this._endMovies}/${movieId}`,
      {
        method: 'DELETE',
        headers: this._headers,
        credentials: this._credentials,
      }
    )
      .then((res) => {
        return this._checkResponse(res);
      })
  }

}

const mainApi = new MainApi(configMainApi, MOVIE_IMAGE_BASE_URL);
export default mainApi

