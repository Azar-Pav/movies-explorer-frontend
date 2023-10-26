import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import AccountButton from '../AccountButton/AccountButton';
import './BurgerMenu.css';

const BurgerMenu = ({ isLoggedIn }) => {
  const [isChecked, setChecked] = useState(false);

  const toggleChecked = () => {
    if (isChecked === true) {
      return setChecked(false)
    }
    return setChecked(true);
  };

  const handlerCheched = (e) => {
    const checked = e.target.checked;
    setChecked(checked);
  }
  return (
    <>
      {isLoggedIn === true ?
        < div className={`burger-menu ${(isChecked === true ? '' : '')}`} >
          < input
            checked={isChecked}
            onChange={handlerCheched}
            name='burgerCheckbox'
            type="checkbox"
            className='burger-menu__checkbox'
            id='burger-menu__checkbox' />

          <label
            htmlFor='burger-menu__checkbox'
            className={`burger-menu__label ${(isChecked === true ? 'burger-menu__label_active' : '')} `}>
          </label>

          <ul
            onClick={toggleChecked}
            className='burger-menu__line-list links-hover'>
            <li className="burger-menu__line-item"></li>
            <li className="burger-menu__line-item"></li>
            <li className="burger-menu__line-item"></li>
            <li className="burger-menu__line-item"></li>
          </ul>

          <div
            className='burger-menu__cover'
            onClick={toggleChecked}>
          </div>

          <nav className={`burger-menu__navigation ${(isChecked === true ? 'burger-menu__navigation_active' : '')}`}>
            <ul
              className='burger-menu__list'>
              <li className='burger-menu__item'>
                <NavLink
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "burger-menu__link links-hover"
                      :
                      isActive
                        ? "burger-menu__link burger-menu__link_active"
                        : "burger-menu__link links-hover"}
                  onClick={toggleChecked}
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <NavLink

                  className={({ isActive, isPending }) =>
                    isPending
                      ? "burger-menu__link links-hover"
                      :
                      isActive
                        ? "burger-menu__link burger-menu__link_active"
                        : "burger-menu__link links-hover"}
                  onClick={toggleChecked}
                  to="/movies">
                  Фильмы
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <NavLink

                  className={({ isActive, isPending }) =>
                    isPending
                      ? "burger-menu__link links-hover"
                      :
                      isActive
                        ? "burger-menu__link burger-menu__link_active"
                        : "burger-menu__link links-hover"}
                  onClick={toggleChecked}
                  to="/saved-movies">
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li className='burger-menu__item'>
                <AccountButton
                  isChecked={isChecked}
                  toggleChecked={toggleChecked}></AccountButton>
              </li>
            </ul>
          </nav>

        </div >
        : null
      }
    </>
  );
}

export default BurgerMenu;
