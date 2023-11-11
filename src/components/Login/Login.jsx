import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import useFormValidation from '../../hooks/useFormValidation';
import { REGEX_EMAIL, ENDPOINTS } from '../../utils/constants';
import './Login.css';

const Login = ({
  onSignIn,
  tooltip,
  onResetTooltip,
  isButtonBlocked
}) => {
  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
  } = useFormValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onSignIn(inputValues);
    }
  }

  return (
    <main className='login auth'>
      <AuthForm
        title={'Рады видеть!'}
        buttonText={'Войти'}
        authMessage={'Ещё не зарегистрированы? '}
        authLinkMessage={'Регистрация'}
        endpoint={ENDPOINTS.REGISTER}
        onSubmit={handleSubmit}
        onDisabled={isValid}
        tooltip={tooltip}
        onResetTooltip={onResetTooltip}
        isButtonBlocked={isButtonBlocked}
      >

        <AuthInput
          inputValue={inputValues.email ?? ''}
          inputType={'email'}
          labelName={'E-mail'}
          placeholderInput={'Введите email'}
          pattern={REGEX_EMAIL}
          idInput={'email'}
          nameInput={'email'}
          erorrMessage={errMessage.email ?? ''}
          onChange={handleChange}
        />

        <AuthInput
          inputValue={inputValues.password ?? ''}
          inputType={'password'}
          labelName={'Пароль'}
          placeholderInput={'Введите пароль'}
          idInput={'pwd'}
          nameInput={'password'}
          erorrMessage={errMessage.password ?? ''}
          onChange={handleChange}
          minLength="4"
        />
      </AuthForm >
    </main >
  );
}

export default Login;
