import React from "react";
import "./Header.css";
import { Link } from 'react-router-dom';
import CategoriesSwitcher from "../CategoriesSwitcher/CategoriesSwitcher";
import CurrenciesSwitcher from "../CurrenciesSwitcher/CurrenciesSwitcher";
import {ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";
import {ReactComponent as CartIcon } from "../../pics/cart-icon.svg";
import MiniCart from "../MiniCart/MiniCart";


export default class Header extends React.Component {


    render() {

        return (
            <header className="header">
                <CategoriesSwitcher />
                <div className="header_center">
                    <HeaderLogo />
                </div>
                <div className="header_right">
                    <CurrenciesSwitcher />
                    <div className="cart-logo">
                        {/* <Link to="/cart">
                            <CartIcon />
                        </Link> */}
                        <MiniCart />
                    </div>
                </div>
            </header>
        )
    }
}

