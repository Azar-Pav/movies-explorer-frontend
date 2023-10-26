import React from 'react';
import AuthForm from '../AuthForm/AuthForm';
import AuthInput from '../AuthInput/AuthInput';
import './Register.css';

const Register = () => {

  return (
    <main className='register auth'>
      <AuthForm
        title={'Добро пожаловать!'}
        buttonText={'Зарегистрироваться'}
        authMessage={'Уже зарегистрированы? '}
        authLinkMessage={'Войти'}
        endpoint={'/signin'}

      >
        <AuthInput
          inputType={'text'}
          labelName={'Имя'}
          inptValue={'Виталий'}
          idInput={'name'}
          nameInput={'authName'}
          placeholderInput={'Введите имя'}
          erorrMessage={'Что - то пошло не так...'}
        />

        <AuthInput
          inputType={'email'}
          labelName={'E-mail'}
          inptValue={'pochta@yandex.ru|'}
          idInput={'email'}
          nameInput={'authEmail'}
          placeholderInput={'Введите email'}
          erorrMessage={'Что - то пошло не так...'}
        />

        <AuthInput
          inputType={'password'}
          labelName={'Пароль'}
          inptValue={'••••••••••••••'}
          idInput={'pwd'}
          nameInput={'authEmail'}
          placeholderInput={'Введите пароль'}
          erorrMessage={'Пожалуйста, используйте не менее 4 символов (сейчас вы используете 3 символов).'}
        />
      </AuthForm >

    </main >
  );
}

export default Register;
