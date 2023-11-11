import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

import useMoviesUtils from '../../hooks/useMoviesUtils';
import useCheckSavedFilm from '../../hooks/useCheckSavedFilm';

import { ENDPOINTS } from '../../utils/constants';

const MoviesCardList = ({
  listMovies,
  requestStorage,
  stateChechbox,
  onSaveFilms,
  onDeleteSavedFilm,
  savedFilms
}) => {
  const { checkSaved } = useCheckSavedFilm();
  const { pathname } = useLocation();
  const isSavedMovies = pathname === ENDPOINTS.SAVED_MOVIES;

  const [filteredFilmsList, setFilteredFilmsList] = useState([]);
  const [savedFilmsList, setSavedFilmsList] = useState([]);

  const {
    addMovies,
    moviesDisplay,
    resizeDelay,
    handleResize,
  } = useMoviesUtils();

  const filteredMovies = listMovies.slice(0, moviesDisplay).map((movie) => {
    return (
      <MoviesCard
        key={isSavedMovies ? movie._id : movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        onSaveFilms={onSaveFilms}
        onDeleteSavedFilm={onDeleteSavedFilm}
        checkSaved={
          isSavedMovies
            ? true
            : checkSaved(savedFilms, movie)}
      />
    )
  });

  const savedMovies = listMovies.map((movie) => {
    return (
      <MoviesCard
        key={isSavedMovies ? movie._id : movie.id}
        movie={movie}
        isSavedMovies={isSavedMovies}
        onSaveFilms={onSaveFilms}
        onDeleteSavedFilm={onDeleteSavedFilm}
        checkSaved={
          isSavedMovies
            ? true
            : checkSaved(savedFilms, movie)}
      />
    )
  });

  useEffect(() => {
    if (isSavedMovies) {
      setSavedFilmsList(savedMovies)
    } else {
      setFilteredFilmsList(filteredMovies);
    }
  }, [moviesDisplay, stateChechbox, listMovies]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', resizeDelay);
    return () => window.removeEventListener('resize', resizeDelay);
  }, []);

  return (
    <section className='movies-list'>
      {listMovies.length !== 0
        ? <ul className='movies-list__list'>
          {isSavedMovies ? savedMovies : filteredMovies}
        </ul>
        : <p
          className='movies-list__not-found'>
          {`${requestStorage !== '' ? 'Ничего не найдено' : ''}`}
        </p>
      }

      {isSavedMovies 
        ? savedFilmsList.length < listMovies.length
        : filteredFilmsList.length < listMovies.length
          ? <button 
            type='button'
            onClick={addMovies}
            className='movies-list__btn-more'
          >
            Ещё
          </button>
          : <div className='movies-list__saved-divider'></div>
      }
    </section >
  );
}

export default MoviesCardList;
