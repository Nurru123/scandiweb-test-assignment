import React from "react";
import "./Header.css";
import CategoriesSwitcher from "../CategoriesSwitcher/CategoriesSwitcher";
import CurrenciesSwitcher from "../CurrenciesSwitcher/CurrenciesSwitcher";
import MiniCart from "../MiniCart/MiniCart";
import { ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";


export default class Header extends React.Component {

    render() {

        return (
            <header className="header">
                <CategoriesSwitcher />
                <HeaderLogo />
                <div className="header__right">
                    <CurrenciesSwitcher />
                    <MiniCart />
                </div>
            </header>
        )
    };
};

