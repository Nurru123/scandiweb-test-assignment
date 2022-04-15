import React from "react";
import "./PLP.css";
import { Routes, Route } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products.js";
import PDP from "../PDP/PDP.js";
import Cart from "../Cart/Cart";

export default class PLP extends React.Component {

    render() {

        return (
            <>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/:id" element={<PDP />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>

            </>
        )
    }
}
