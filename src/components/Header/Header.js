import React from "react";
import "./Header.css";
import Categories from "./Categories/Categories";
import Currencies from "./Currencies/Currencies";
import {ReactComponent as HeaderLogo } from "../../pics/header-logo.svg";
import {ReactComponent as CartIcon } from "../../pics/cart-icon.svg";


export default class Header extends React.Component {


    render() {

        return (
            <header className="header">
                <Categories />
                <div className="header_center">
                    <HeaderLogo />
                </div>
                <div className="header_right">
                    <Currencies />
                    <div className="cart-logo">
                        <CartIcon />
                    </div>
                </div>
            </header>
        )
    }
}

