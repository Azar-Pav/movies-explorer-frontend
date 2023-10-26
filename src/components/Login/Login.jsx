import React, { useState } from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import './Login.css';
const Login = ({
  onSignIn,
}) => {
  const [formValue, setFormValue] = useState({
    authEmail: '',
    authPwd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({ ...formValue, [name]: value });
  }

  const handleClick = (e) => {
    e.preventDefault();
    onSignIn();
  }

  return (
    <main className='login auth'>
      <AuthForm
        title={'Рады видеть!'}
        buttonText={'Войти'}
        authMessage={'Ещё не зарегистрированы? '}
        authLinkMessage={'Регистрация'}
        endpoint={'/signup'}
        onClickLogin={handleClick}
      >

        <AuthInput
          inputValue={formValue.authEmail}
          inputType={'email'}
          labelName={'E-mail'}
          placeholderInput={'Введите email'}

          inptValue={'pochta@yandex.ru|'}
          idInput={'email'}
          nameInput={'authEmail'}
          erorrMessage={'Что - то пошло не так...'}
          onChange={handleChange}
        />

        <AuthInput
          inputValue={formValue.authPwd}
          inputType={'password'}
          labelName={'Пароль'}
          placeholderInput={'Введите пароль'}
          idInput={'pwd'}
          nameInput={'authPwd'}
          erorrMessage={'Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов).'}
          onChange={handleChange}
        />
      </AuthForm >
    </main >
  );
}

export default Login;
