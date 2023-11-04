export const ENDPOINTS = {
  MAIN: '/',
  REGISTER: '/signup',
  LOGIN: '/signin',
  MOVIES: '/movies',
  PROFILE: '/profile',
  SAVED_MOVIES: '/saved-movies'
}

export const configMainApi = {
  BASE_URL: 'https://api.movies-explorer.azar.nomoredomainsrocks.ru',
  HEADERS: {
    accept: 'application/json',
    'Content-type': 'application/json',
  },
  CREDENTIALS: 'include',
  ENDPOINTS: {
    REGISTER: '/signup',
    LOGIN: '/signin',
    LOGOUT: '/signout',
    MOVIES: '/movies',
    USER: '/users/me',
  },
  MOVIE_IMAGE_BASE_URL: 'https://api.nomoreparties.co/',
};

export const MESSAGES = {
    SEARCH_PLACEHOLDER_INPUT: 'Фильм',
    EMPTY_PLACEHOLDER_INPUT: 'Нужно ввести ключевое слово',
    USER_EXIST: ' Пользователь с таким email уже существует.',
    REGISTER_USER_ERROR: 'При регистрации пользователя произошла ошибка.',
    LOGIN_PASSWORD_INCORRECT: 'Вы ввели неправильный логин или пароль.',
    AUTH_ERROR: 'При авторизации произошла ошибка.',
    USER_DATA_MODIFIED: 'Данные профиля успешно изменены.',
};
