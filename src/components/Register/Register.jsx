import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import useFormValidation from '../../hooks/useFormValidation';
import { REGEX_EMAIL, REGEX_NAME, ENDPOINTS } from '../../utils/constants';
import './Register.css';

const Register = ({
  onRegister,
  tooltip,
  onResetTooltip,
  isButtonBlocked
}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onRegister(inputValues);
    }
  }

  const {
    inputValues,
    errMessage,
    isValid,
    handleChange,
  } = useFormValidation();

  return (
    <main className='register auth'>
      <AuthForm
        title={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        authMessage={'Уже зарегистрированы? '}
        authLinkMessage={'Войти'}
        endpoint={ENDPOINTS.LOGIN}
        onSubmit={handleSubmit}
        onDisabled={isValid}
        tooltip={tooltip}
        onResetTooltip={onResetTooltip}
        isButtonBlocked={isButtonBlocked}
      >
        <AuthInput
          inputValue={inputValues.name ?? ''}
          inputType={'text'}
          labelName={'Имя'}
          idInput={'name'}
          nameInput={'name'}
          placeholderInput={'Введите имя'}
          erorrMessage={errMessage.name ?? ''}
          onChange={handleChange}
          pattern={REGEX_NAME}
        />

        <AuthInput
          inputValue={inputValues.email ?? ''}
          inputType={'email'}
          labelName={'E-mail'}
          idInput={'email'}
          nameInput={'email'}
          placeholderInput={'Введите email'}
          erorrMessage={errMessage.email ?? ''}
          onChange={handleChange}
          pattern={REGEX_EMAIL}
        />

        <AuthInput
          inputValue={inputValues.password ?? ''}
          inputType={'password'}
          labelName={'Пароль'}
          idInput={'pwd'}
          nameInput={'password'}
          placeholderInput={'Введите пароль'}
          erorrMessage={errMessage.password ?? ''}
          onChange={handleChange}
          minLength="4"
        />
      </AuthForm >

    </main >
  );
}

export default Register;
