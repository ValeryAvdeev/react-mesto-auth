import React, {useContext} from "react";
import mainLogo from "../images/header-logo.svg";
import {Link} from "react-router-dom";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Header(props) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <header className="header">
      <img
        src={mainLogo}
        alt="логотип проекта Место России."
        className="header__logo"
      />
        <div className='header__info'>
          <p className='header__user'>{currentUser.email}</p>
          <Link
            to={props.route}
            className='header__link'
            type='button'
            onClick={props.onClick}
          >
            {props.title}
          </Link>
        </div>
    </header>
  )
};

export default Header;