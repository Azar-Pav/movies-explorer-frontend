import React from 'react';
import { useLocation } from 'react-router-dom'
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { movies } from '../../utils/movies-list.js';
import { moviesSaved } from '../../utils/movies-list-saved.js';

const MoviesCardList = () => {

  const { pathname } = useLocation();

  const moviesList = movies.map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  });

  const moviesSavedList = moviesSaved.map((movie) => {
    return (
      <MoviesCard
        key={movie.id}
        movie={movie}
      />
    )
  });

  return (
    <section className='movies-list'>
      <ul className='movies-list__list'>
        {pathname === '/movies' ? moviesList : moviesSavedList}
      </ul>
      {pathname === '/movies' ? <button type='button' className='movies-list__btn-more' >Ещё</button>
        : <div className='movies-list__saveddevider'></div>}
    </section >
  );
}

export default MoviesCardList;
