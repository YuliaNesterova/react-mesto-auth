import React from "react";
import logo from "../images/header__logo.svg";
import {Link} from "react-router-dom";

export default function Header(props) {
    return (
        <header className="header">
            <img src={logo} alt="Место" className="header__logo"/>
            {props.loggedIn ? <div className="header__wrapper">
                <p className="header__email">hdkdgh@jgs.ru</p>
                <Link to="/sign-out" className="header__link header__link_type_signout">Выйти</Link>
            </div> : props.isLoginActive ? <Link to="/sign-up" className="header__link">Регистрация</Link> :
                    <Link to="/sign-in" className="header__link">Войти</Link> }


        </header>
    );
}
