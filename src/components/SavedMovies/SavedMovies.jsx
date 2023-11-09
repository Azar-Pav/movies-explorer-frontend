import React, { useState, useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import useFilterFilms from '../../hooks/useFilterFilms';

const SavedMovies = ({
  savedFilms,
  onDeleteSaveFilm,
}) => {
  const [listMovies, setListMovies] = useState([]);

  const [isRequestBlock, setIsRequestBlock] = useState('');

  const [isCheckedShortFilms, setIsCheckedShortFilms] = useState(false);

  const { foundFilms } = useFilterFilms();

  const handleChangeCheckbox = () => {
    if (savedFilms) {
      setIsCheckedShortFilms(!isCheckedShortFilms);
      if (listMovies !== 0) {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, !isCheckedShortFilms)
        );
      }
    }
  };

  const handleSubmit = (request) => {
    filteredFilms(request);
  };

  const filteredFilms = (request) => {
    setIsRequestBlock(request);
    setListMovies(
      foundFilms(savedFilms, request, isCheckedShortFilms)
    );
  };

  useEffect(() => {
    if (savedFilms) {
      if (isCheckedShortFilms || isRequestBlock !== '') {
        setListMovies(
          foundFilms(savedFilms, isRequestBlock, isCheckedShortFilms)
        );
        return
      }
      setListMovies(savedFilms);
    }
  }, [savedFilms]);

  return (
    <div className='movies'>
      <SearchForm
        onChange={handleChangeCheckbox}
        onSubmit={handleSubmit}
        isChecked={isCheckedShortFilms}/>
      <MoviesCardList
        listMovies={listMovies}
        onDeleteSaveFilm={onDeleteSaveFilm}
      />
    </div>
  );
}

export default SavedMovies;
