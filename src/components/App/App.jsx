import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

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

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import { ENDPOINTS, MESSAGES, ERROR_CODES } from '../../utils/constants';

import mainApi from '../../utils/MainApi';

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const [registerTooltip, setRegisterTooltip] = useState({
    visible: false,
    message: '',
  });
  const [loginTooltip, setLoginTooltip] = useState({
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
  });

  const [isRegisterButtonBlocked, setRegisterButtonBlocked] = useState(false);
  const [isLoginButtonBlocked, setLoginButtonBlocked] = useState(false);
  const [isProfileButtonBlocked, setProfileButtonBlocked] = useState(false);
  const [isMoviesButtonBlocked, setMoviesButtonBlocked] = useState(false);
  
  const onResetTooltip = () => {
    setRegisterTooltip({
      visible: false,
      message: '',
    });
    setLoginTooltip({
      visible: false,
      message: '',
    });
    setProfileTooltip({
      visible: false,
      message: '',
      success: false,
    });
    setMoviesTooltip({
      visible: false,
      message: '',
    });
  }

  const handleRegister = ({ email, password, name }) => {
    setRegisterButtonBlocked(true);
    mainApi.register({ email, password, name })
      .then((res) => {
        handleLogin({ email, password });
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

  const handleLogin = ({ email, password }) => {
    setLoginButtonBlocked(true);
    mainApi.login({ email, password })
      .then((res) => {
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        if (err === ERROR_CODES.ERR_401) {
          setLoginTooltip({
            visible: true,
            message: MESSAGES.LOGIN_PASSWORD_INCORRECT,
          });
          setLoginButtonBlocked(false);
        } else {
          setLoginTooltip({
            visible: true,
            message: MESSAGES.AUTHORIZATION_ERROR,
          });
          setLoginButtonBlocked(false);
        }
      })
      .finally(() => {
        setLoginButtonBlocked(false);
        onResetTooltip();
      })
  };

  const onSignOut = () => {
    setLoggedIn(false)
  };

  return (
    <CurrentUserContext.Provider
      value={currentUser}
    >
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
              element={<ProtectedRoute
                element={Movies}
              />} 
            />
            <Route
              path={ENDPOINTS.SAVED_MOVIES}
              element={<ProtectedRoute
                element={SavedMovies}
              />}
            />
            <Route
              path={ENDPOINTS.REGISTER}
              element={<Register
                onRegister={handleRegister}
                tooltip={registerTooltip}
                onResetTooltip={onResetTooltip}
                isButtonBlocked={isRegisterButtonBlocked}
              />} 
            />
            <Route
              path={ENDPOINTS.LOGIN} 
              element={<Login
                onSignIn={handleLogin}
                tooltip={loginTooltip}
                onResetTooltip={onResetTooltip}
                isButtonBlocked={isLoginButtonBlocked}
              />} 
            />
            <Route
              path={ENDPOINTS.PROFILE}
              element={<ProtectedRoute 
                element={Profile}
                onSignOut={onSignOut}
              />}
            />
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
          <Footer/>
        </div>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
