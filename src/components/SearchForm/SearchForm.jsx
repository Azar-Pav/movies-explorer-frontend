import React, { useState, useRef, useEffect } from 'react';
import useFormValidation from '../../hooks/useFormValidation';
import { MESSAGES } from '../../utils/constants';
import './SearchForm.css';

const SearchForm = ({
  onSubmit,
  isLoading,
  isChecked,
  onChange,
  oldRequest,
}) => {

  const [errSearchMessage, setErrSearchMessage] = useState(MESSAGES.SEARCH_PLACEHOLDER_INPUT);
  const inputSearch = useRef(null);

  const {
    inputValues,
    isValid,
    handleChange,
  } = useFormValidation();

  const searchFormValidation = (isValid) => {
    if (isValid) {
      setErrSearchMessage(MESSAGES.SEARCH_PLACEHOLDER_INPUT)
    }
    else { 
      setErrSearchMessage(MESSAGES.EMPTY_PLACEHOLDER_INPUT) 
    }
    inputSearch.current.focus();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    searchFormValidation(isValid);
    if (isValid) {
      onSubmit(inputValues.inputSearch);
    }
  };

  useEffect(() => {
    if (oldRequest !== '') {
      inputValues.inputSearch = oldRequest;
    }
  }, []);

  return (
    <section className="search">
      <div className="search__container">
        <form
          onSubmit={handleSubmit}
          className="search__form"
          noValidate>
          <fieldset className='search__fieldset'>
            <label htmlFor="search__input" className='search__label-form'>
              <input
                type="text"
                className="search__input"
                id="search__input"     
                name='inputSearch'   
                placeholder={errSearchMessage}
                ref={inputSearch}
                value={inputValues.inputSearch ?? ''}
                onChange={handleChange} 
                required
              />
            </label>
          </fieldset>
          <button 
            type='submit' 
            className="search__button links-hover"
            disabled={isLoading}></button>
        </form>
        <div className="search__wrapper">
          <label
            className='search__switch'
            htmlFor="search__checkbox">
            <input
              type="checkbox"
              className="search__checkbox"
              id='search__checkbox'
              onChange={onChange}
              checked={isChecked}
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
