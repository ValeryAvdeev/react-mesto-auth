import React from "react";
import mainLogo from "../images/header-logo.svg";
import {Link} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img
        src={mainLogo}
        alt="логотип проекта Место России."
        className="header__logo"
      />
        <div>
          <p className='header__user'>{props.email}</p>
          <Link
            to={props.route}
            className='header__link'
          >
            {props.title}
          </Link>
        </div>
    </header>
  )
};

export default Header;