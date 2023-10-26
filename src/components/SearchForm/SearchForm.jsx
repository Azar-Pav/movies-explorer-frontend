import React from 'react';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <section className="search">
      <div className="search__container">
        <form
          action=""
          className="search__form"
          noValidate>
          <fieldset className='search__fieldset'>
            <label htmlFor="search__input" className='search__label-form'>
              <input
                type="text"
                className="search__input"
                id="search__input"
                placeholder='Фильм' />
            </label>
          </fieldset>
          <button type='submit' className="search__button links-hover"></button>
        </form>
        <div className="search__wrapper">
          <label
            className='search__switch'
            htmlFor="search__checkbox">
            <input
              type="checkbox"
              className="search__checkbox"
              id='search__checkbox'
            />
            <div className="search__slider search__slider_round"></div>
          </label>
          <label
            className='search__label-text'
            htmlFor="search__checkbox">Короткометражки</label>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
