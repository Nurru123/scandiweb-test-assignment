import React from "react";
import "./PLP.css";
import { Routes, Route, useParams } from 'react-router-dom';
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products.js";
import PDP from "../PDP/PDP.js";
import Cart from "../Cart/Cart";

export default class PLP extends React.Component {

    render() {

        const Wrapper = () => {
            const params = useParams();
            return <PDP { ...{match: {params}} }/>
        };

        return (
            <>
                <Header />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/product/:id" element={<Wrapper />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>

            </>
        )
    }
}
