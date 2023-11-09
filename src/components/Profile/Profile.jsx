import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { REGEX_EMAIL } from '../../utils/constants';
import './Profile.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

const Profile = ({ 
  onSignOut,
  tooltip,
  onResetTooltip,
  isButtonBlocked,
  onUpdateUserInfo
 }) => {
  const { name, email } = useContext(CurrentUserContext);
  const [isVisible, setIsVisible] = useState(true);

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    setInputValues,
    setIsValid,
  } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onUpdateUserInfo(inputValues);
    };
  }

  const handleClickEdit = (e) => {
    e.preventDefault();
    onResetTooltip();
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    setInputValues({ name, email });
  }, [name, email, setInputValues]);

  useEffect(() => {
    if (inputValues.name === name
      && inputValues.email === email
    ) {
      setIsValid(false);
    }
  }, [email, inputValues, name, setIsValid])

  return (
    <main
      className='profile'>
      <div className="profile__container">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className='profile__form'
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="email"
            className='profile__label'>
            Имя
            <input
              placeholder='Введите имя'
              name='name'
              type="text"
              id='name'
              className='profile__input'
              value={inputValues.name ?? ''}
              onChange={handleChange}
              disabled={isVisible}
              required />
            <span
              className='profile__error'>
              {errMessage.name}
            </span>
          </label>

          <div className="profile__line"></div>

          <label
            htmlFor="name"
            className='profile__label'>
            E-mail
            <input
              placeholder='Введите e-mail'
              name='email'
              type="email"
              id='name'
              className='profile__input'
              pattern={REGEX_EMAIL}
              value={inputValues.email ?? ''}
              onChange={handleChange}
              disabled={isVisible}
              required 
            />
            <span
              className='profile__error'>
              {errMessage.email}
            </span>
          </label>
          <span className={`profile__error-submit 
            ${isVisible ? '' : 'profile__error-submit_show'}
            ${tooltip.success ? 'profile__error-submit_success' : ''}`}>
            {tooltip.message}              
          </span>
          <button
            disabled={!isValid || isButtonBlocked}
            className={`profile__btn-save  ${isVisible ? '' : 'profile__btn-save_show'} `}
          >
            Сохранить
          </button>
        </form>

        <button
          onClick={handleClickEdit}
          className={`profile__btn-redact ${isVisible ? 'profile__btn-redact_show' : ''} links-hover`}
        >
          Редактировать
        </button>

        <Link
          to='/'
          className={`profile__link ${isVisible ? 'profile__link_show' : ''} links-hover`}
          onClick={onSignOut}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </main >
  );
}

export default Profile;
