import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
  const [savedFilms, setSavedFilms] = useState([]);

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

  const [isRegisterButtonBlocked, setRegisterButtonBlocked] = useState(false);
  const [isLoginButtonBlocked, setLoginButtonBlocked] = useState(false);
  const [isProfileButtonBlocked, setProfileButtonBlocked] = useState(false);
  
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
        navigate(ENDPOINTS.MOVIES, { replace: true });
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
            message: MESSAGES.AUTH_ERROR,
          });
          setLoginButtonBlocked(false);
          console.error(err);
        }
      })
      .finally(() => {
        setLoginButtonBlocked(false);
        onResetTooltip();
      })
  };

  const handleUpdateUserInfo = ({ name, email }) => {
    setProfileButtonBlocked(true);
    mainApi.updateUserInfo({ name, email })
      .then((user) => {
        setCurrentUser(user);
        setProfileTooltip({
          visible: true,
          success: true,
          message: MESSAGES.USER_DATA_MODIFIED,
        });
      })
      .catch((err) => {
        if (err === ERROR_CODES.ERR_409) {
          setProfileTooltip({
            visible: true,
            success: false,
            message: MESSAGES.USER_EXIST,
          });
          setProfileButtonBlocked(false);
        } else {
          setProfileTooltip({
            visible: true,
            success: false,
            message: MESSAGES.REGISTER_USER_ERROR,
          });
          setProfileButtonBlocked(false);
          console.error(err);
        }
      })
      .finally(() => {
        setProfileButtonBlocked(false);
      });
  }

  const onSignOut = () => {
    mainApi.logout()
      .then(() => {
        localStorage.removeItem('moviesFullList');
        localStorage.removeItem('request');
        localStorage.removeItem('checkboxMoviesStorage');
        onResetTooltip();
        setLoggedIn(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSaveFilms = (movie) => {
    mainApi.getSavedMovie(movie)
      .then((data) => {
        setSavedFilms([data, ...savedFilms]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleDeleteSavedFilm = (movieId) => {
    mainApi.deleteMovie(movieId)
      .then(() => {
        setSavedFilms(
          savedFilms.filter((movie) => {
            return movie._id !== movieId;
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const gettingSavedFilms = () => {
    mainApi.getMovies()
      .then((data) => {
        setSavedFilms(data.movies);
      })
      .catch((err) => {
        console.error(err)
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      gettingSavedFilms();
      mainApi.getUser()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

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
                loggedIn={isLoggedIn}
                element={Movies}
                onSaveFilms={handleSaveFilms}
                savedFilms={savedFilms}
                onDeleteSaveFilm={handleDeleteSavedFilm}
              />} 
            />
            <Route
              path={ENDPOINTS.SAVED_MOVIES}
              element={<ProtectedRoute
                loggedIn={isLoggedIn}
                element={SavedMovies}
                savedFilms={savedFilms}
                onDeleteSaveFilm={handleDeleteSavedFilm}
              />}
            />
            <Route
              path={ENDPOINTS.REGISTER}
              element={isLoggedIn
                ? <Navigate to={ENDPOINTS.MOVIES} replace/>
                : <Register
                  onRegister={handleRegister}
                  tooltip={registerTooltip}
                  onResetTooltip={onResetTooltip}
                  isButtonBlocked={isRegisterButtonBlocked}
                />
              } 
            />
            <Route
              path={ENDPOINTS.LOGIN} 
              element={isLoggedIn
                ? <Navigate to={ENDPOINTS.MOVIES} replace/>
                : <Login
                  onSignIn={handleLogin}
                  tooltip={loginTooltip}
                  onResetTooltip={onResetTooltip}
                  isButtonBlocked={isLoginButtonBlocked}
                />
              } 
            />
            <Route
              path={ENDPOINTS.PROFILE}
              element={<ProtectedRoute 
                loggedIn={isLoggedIn}
                element={Profile}
                onSignOut={onSignOut}
                tooltip={profileTooltip}
                onResetTooltip={onResetTooltip}
                isButtonBlocked={isProfileButtonBlocked}
                onUpdateUserInfo={handleUpdateUserInfo}
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
