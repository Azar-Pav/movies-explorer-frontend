import { configMainApi, MOVIE_IMAGE_BASE_URL } from './constants';

const {
  BASE_URL,
  HEADERS,
  CREDENTIALS,
  ENDPOINTS
} = configMainApi;

const {
  REGISTER,
  LOGIN,
  LOGOUT,
  MOVIES,
  USER
} = ENDPOINTS;

const _checkResponse = (res) => {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

export const register = ({ email, password, name }) => {
  return fetch(
    `${BASE_URL}${REGISTER}`,
    {
      method: 'POST',
      headers: HEADERS,
      credentials: CREDENTIALS,
      body: JSON.stringify({ email, password, name })
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
};

export const login = ({ email, password }) => {
  return fetch(
    `${BASE_URL}${LOGIN}`,
    {
      method: 'POST',
      headers: HEADERS,
      credentials: CREDENTIALS,
      body: JSON.stringify({ email, password })
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
};

export const logout = () => {
  return fetch(
    `${BASE_URL}${LOGOUT}`,
    {
      method: 'POST',
      headers: HEADERS,
      credentials: CREDENTIALS,
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
}

export const getUser = () => {
  return fetch(
    `${BASE_URL}${USER}`,
    {
      method: 'GET',
      headers: HEADERS,
      credentials: CREDENTIALS,
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
};

export const updateUserInfo = ({ name, email }) => {
  return fetch(
    `${BASE_URL}${USER}`,
    {
      method: 'PATCH',
      headers: HEADERS,
      credentials: CREDENTIALS,
      body: JSON.stringify({ name, email })
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
}

export const getSavedMovie = (movie) => {
  return fetch(
    `${BASE_URL}${MOVIES}`,
    {
      method: 'POST',
      headers: HEADERS,
      credentials: CREDENTIALS,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `${MOVIE_IMAGE_BASE_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `${MOVIE_IMAGE_BASE_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      })
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
};


export const getMovies = () => {
  return fetch(
    `${BASE_URL}${MOVIES}`,
    {
      method: 'GET',
      headers: HEADERS,
      credentials: CREDENTIALS,
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
}

export const deleteMovie = (movieId) => {
  return fetch(
    `${BASE_URL}${MOVIES}/${movieId}`,
    {
      method: 'DELETE',
      headers: HEADERS,
      credentials: CREDENTIALS,
    }
  )
    .then((res) => {
      return _checkResponse(res);
    })
}
