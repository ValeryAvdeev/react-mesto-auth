import React from "react";
import mainLogo from "../images/header-logo.svg";
import {Route, Link, Routes} from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <img
        src={mainLogo}
        alt="логотип проекта Место России."
        className="header__logo"
      />
      <Routes>
        <Route path="sing-up" element={
          <Link
            to="/sing-in"
            className='header__link'
          >
            Войти
          </Link>
        }
        />

        <Route path="sing-in" element={
          <Link to="/sing-up" className='header__link'>
            Зарегистрироваться
          </Link>
        }
        />
      </Routes>


      {/*<Route path="/sign-in">*/}
      {/*  <Link to="/sign-up">Зарегистрироваться</Link>*/}
      {/*</Route>*/}
      {/*<Route path="/">*/}
      {/*  <Link to="/sign-in">Выйти</Link>*/}
      {/* </Route>*/}
    </header>
  )
};

export default Header;