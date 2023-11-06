import React from 'react';
import { Link } from 'react-router-dom';

import './AuthForm.css';


const AuthForm = ({ title,
  buttonText,
  authMessage,
  authLinkMessage,
  endpoint,
  onSubmit,
  onDisabled,
  ...props }) => {

  return (
    <>
      <h1 className='auth__title'>{title}</h1>
      <form className='auth__form'
        onSubmit={onSubmit}
        noValidate
      >
        {props.children}
        <button
          type='submit'
          className='auth__btn'
          disabled={!onDisabled}
        >{buttonText}</button>
      </form>

      <div className='auth__wrapper'>
        <p className="auth__paragraph">
          {authMessage}
          <span className='auth__link'>
            <Link
              to={endpoint}
              className='auth__link links-hover'
            >
              {authLinkMessage}
            </Link>
          </span>
        </p>
      </div>
    </>
  );
}

export default AuthForm;
