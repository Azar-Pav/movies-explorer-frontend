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

import { ENDPOINTS } from '../../utils/constats';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

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
            element={<Register/>} 
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
