import React, { useState, useEffect } from 'react';
import './Movies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import { getFilms } from '../../utils/MoviesApi';
import useFilterFilms from '../../hooks/useFilterFilms';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';

const Movies = ({
  onSaveFilm,
  savedFilms,
  onDeleteSavedFilm,
}) => {
  const allMovies = JSON.parse(localStorage.getItem('moviesFullList')) ?? [];
  const requestStorage = JSON.parse(localStorage.getItem('request')) ?? '';
  const checkboxMoviesStorage = JSON.parse(localStorage.getItem('checkboxMoviesStorage')) ?? false;
  
  const [isLoading, setIsLoading] = useState(false);

  const [listOfFoundMovies, setListOfFoundMovies] = useState([]);

  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(checkboxMoviesStorage);

  const { foundFilms } = useFilterFilms();
  const { checkSaved } = useCheckSavedFilm();

  const filterFilms = (movies, request, isCheckedShortFilms) => {
    setListOfFoundMovies(foundFilms(movies, request, isCheckedShortFilms));
  }

  const handleChangeCheckbox = () => {
    localStorage.setItem('checkboxMoviesStorage', JSON.stringify(!isCheckedShortFilms));
    setIsCheckedShortFilms(!isCheckedShortFilms);
    if (allMovies.length !== 0) {
      setListOfFoundMovies(foundFilms(allMovies, requestStorage, !isCheckedShortFilms));
    }
  }

  const handleSavedFilms = (movie) => {
    const savedFilm = checkSaved(savedFilms, movie);
    if (savedFilm) {
      onDeleteSavedFilm(savedFilm._id);
      return;
    } else {
      onSaveFilm(movie);
    }
  }

  const gettingFilms = (request) => {
    setIsLoading(true);
    getFilms()
      .then((moviesFullList) => {
        localStorage.setItem('moviesFullList', JSON.stringify(moviesFullList));
        filterFilms(moviesFullList, request, isCheckedShortFilms);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  };

  const handleSubmit = (request) => {
    if (allMovies.length === 0) {
      gettingFilms(request);
    } else {
      setListOfFoundMovies(foundFilms(allMovies, request, isCheckedShortFilms))
    }

    localStorage.setItem('request', JSON.stringify(request));
  }


  useEffect(() => {
    if (requestStorage !== '') {
      setListOfFoundMovies(foundFilms(allMovies, requestStorage, isCheckedShortFilms));
    } else {
      setIsCheckedShortFilms(false);
    }
  }, []);

  return (
    <main className='movies'>
      <SearchForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isChecked={isCheckedShortFilms}
        onChange={handleChangeCheckbox}
        oldRequest={requestStorage}
        listMovies={listOfFoundMovies}
      />
      {isLoading
        ? <Preloader />
        : <MoviesCardList
          requestStorage={requestStorage}
          listMovies={listOfFoundMovies}
          stateChechbox={isCheckedShortFilms}
          onSaveFilms={handleSavedFilms}
          savedFilms={savedFilms}
        />
      }
    </main>
  );
}

export default Movies;
