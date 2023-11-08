import { configBeatfilmApi } from '../utils/constants'

const checkError = (res) => {
  if (res.ok) {
    return res.json();
  }
  else {
    return Promise.reject(res.status);
  }
}

export const getFilms = () => {
  return fetch(
    configBeatfilmApi.BASE_URL,
    {
      methods: 'GET',
      headers: configBeatfilmApi.headers,
    },
  )
    .then((res) => {
      return checkError(res);
    })
}
