import React from 'react';
import './AboutMe.css';
import portret from '../../images/foto_title.png'

const AboutMe = () => {
  return (
    <section className='student' id='student'>
      <h2 className="student__title">Студент</h2>
      <ul className='student__container'>
        <li className="student__wrapper student__wrapper_content_info">
          <h3 className="student__name">Виталий</h3>
          <h4 className="student__about">Фронтенд-разработчик, 30 лет</h4>
          <p className="student__description">Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ. У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом. Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;. После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами и&nbsp;ушёл с&nbsp;постоянной работы.</p>

          <ul className='student__contacts'>
            <li className='student__contact'>
              <a href="https://github.com/Azar-Pav"
                target='_blank'
                className="student__link links-hover">
                Github
              </a>
            </li>
          </ul>

        </li>
        <li className="student__wrapper">
          <img src={portret} alt="!" className='student__portret' />
        </li>
      </ul>


      <h2 className="student__title student__title_content_portfolio">Портфолио</h2>
      <ul className='student__list-portfolio'>
        <li className='student__item-portfolio'>
          <a href="https://github.com/Azar-Pav/how-to-learn"
            target='_blank'
            className="student__link-portfolio links-hover">
            Статичный сайт
            <span className="student__arrow-portfolio">
              ↗
            </span>
          </a>
        </li>
        <li className='student__item-portfolio'>
          <a href="https://github.com/Azar-Pav/russian-travel"
            target='_blank'
            className="student__link-portfolio links-hover">
            Адаптивный сайт
            <span className="student__arrow-portfolio">
              ↗
            </span>
          </a>
        </li>
        <li className='student__item-portfolio'>
          <a href="https://github.com/Azar-Pav/react-mesto-auth"
            target='_blank'
            className="student__link-portfolio links-hover">
            Одностраничное приложение
            <span className="student__arrow-portfolio">
              ↗
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default AboutMe;
