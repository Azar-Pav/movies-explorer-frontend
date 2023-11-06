import React, { useState/* , useEffect */ } from 'react';
import { Link } from 'react-router-dom';
import useFormValidation from '../../hooks/useFormValidation';
import { REGEX_EMAIL } from '../../utils/constants';
import './Profile.css';

const Profile = ({ onSignOut }) => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClick = (e) => {
    onSignOut();
  }

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
    /* setInputValues, */
    /* setIsValid, */
  } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleClickEdit = (e) => {
    e.preventDefault();
    if (isVisible === true) {
      return setIsVisible(false)
    }
    return setIsVisible(true);
  }

/*   useEffect(() => {
    if (
      inputValues.name === name
      && 
      inputValues.email === email
    ) {
      setIsValid(false);
    }
  }, [inputValues, setIsValid]) */

  return (
    <main
      className='profile'>
      <div className="profile__container">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className='profile__form'
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="email"
            className='profile__label'>
            Имя
            <input
              placeholder='Введите имя'
              type="text"
              id='email'
              className='profile__input'
              value={inputValues.name ?? ''}
              onChange={handleChange}
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
              type="email"
              id='name'
              className='profile__input'
              pattern={REGEX_EMAIL}
              value={inputValues.email ?? ''}
              onChange={handleChange}
              required />
            <span
              className='profile__error'>
              {errMessage.email}
            </span>
          </label>
          <span className={`profile__error-submit ${isVisible ? '' : 'profile__error-submit_show'}`}>
              
          </span>
          <button
            disabled={!isValid}
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
          onClick={handleClick}
        >
          Выйти из аккаунта
        </Link>
      </div>
    </main >
  );
}

export default Profile;
