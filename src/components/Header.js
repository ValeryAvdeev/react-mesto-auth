import React from "react";
import mainLogo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img
        src={mainLogo}
        alt="логотип проекта Место России."
        className="header__logo"
      />
    </header>
  )
};

export default Header;