import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import Footer from '../Footer/Footer';
import PageNotFound from '../PageNotFound/PageNotFound';

import { ENDPOINTS, MESSAGES, ERROR_CODES } from '../../utils/constants';

import mainApi from '../../utils/MainApi';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const [registerTooltip, setRegisterTooltip] = useState({
    visible: false,
    message: '',
  });
/*   const [loginTooltip, setLoginTooltip] = useState({
    visible: false,
    message: '',
  });
  const [profileTooltip, setProfileTooltip] = useState({
    visible: false,
    message: '',
    success: false,
  });
  const [moviesTooltip, setMoviesTooltip] = useState({
    visible: false,
    message: '',
  }); */

  const [isRegisterButtonBlocked, setRegisterButtonBlocked] = useState(false);
  /* const [isLoginButtonBlocked, setLoginButtonBlocked] = useState(false);
  const [isProfileButtonBlocked, setProfileButtonBlocked] = useState(false);
  const [isMoviesButtonBlocked, setMoviesButtonBlocked] = useState(false); */
  
  const onResetRegisterTooltip = () => {
    setRegisterTooltip({
      visible: false,
      message: '',
    });
  }

  const handleRegister = ({ email, password, name }) => {
    setRegisterButtonBlocked(true);
    mainApi.register({ email, password, name })
      .then((res) => {
        onSignIn();
      })
      .catch((err) => {
        if (err === ERROR_CODES.ERR_409) {
          setRegisterTooltip({
            visible: true,
            message: MESSAGES.USER_EXIST,
          });
        } else {
          setRegisterTooltip({
            visible: true,
            message: MESSAGES.REGISTER_USER_ERROR,
          });
        }
        console.error(err);
      })
      .finally(() => {
        setRegisterButtonBlocked(false);
      })
  };

  const onSignOut = () => {
    setLoggedIn(false)
  };

  const onSignIn = () => {
    setLoggedIn(true);
  }

  return (
    <div className='app'>
      <div className='page'>
        <Header isLoggedIn={isLoggedIn}/>
        <Routes>
          <Route 
            path={ENDPOINTS.MAIN} 
            element={<Main/>} 
          />
          <Route 
            path={ENDPOINTS.MOVIES}
            element={<Movies/>} 
          />
          <Route
            path={ENDPOINTS.SAVED_MOVIES}
            element={<SavedMovies/>}
          />
          <Route
            path={ENDPOINTS.REGISTER}
            element={<Register
              onRegister={handleRegister}
              tooltip={registerTooltip}
              onResetTooltip={onResetRegisterTooltip}
              isButtonBlocked={isRegisterButtonBlocked}
            />} 
          />
          <Route
            path={ENDPOINTS.LOGIN} 
            element={<Login onSignIn={onSignIn}/>} 
          />
          <Route
            path={ENDPOINTS.PROFILE}
            element={<Profile onSignOut={onSignOut}/>}
          />
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
        <Footer/>
      </div>
    </div >
  );
}

export default App;
