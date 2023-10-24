import React from 'react';
import './MoviesCard.css'; 
import { useLocation } from 'react-router-dom'

const MoviesCard = ({
  movie
}) => {

  const { pathname } = useLocation();

  function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
      minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + "ч" + minutes + 'м';
  }

  return (
    <li className='movie-card'>
      <img src={movie.url}
        alt={movie.description}
        className='movie-card__image' />
      <div className="movie-card__wrapper">
        <div className="movie-card__info">
          <h2 className='movie-card__title'>
            {movie.name}
          </h2>
          <p className="movie-card__duration">{msToTime(movie.duration)}</p>
        </div>

        {pathname === '/movies'
          ? <button className={`movie-card__btn ${movie.status === true ? 'movie-card__btn_saved' : ''} links-hover`}></button>
          : <button className={`movie-card__btn movie-card__btn_delete-saved links-hover`}></button>}
      </div>

    </li>
  );
}

export default MoviesCard;
