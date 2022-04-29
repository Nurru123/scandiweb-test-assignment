import React from "react";
import "./PLP.css";
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products.js";
import PDP from "../PDP/PDP.js";
import Cart from "../Cart/Cart";

class PLP extends React.Component {

    render() {

        const Wrapper = () => {
            const params = useParams();
            return <PDP {...{ match: { params } }} />
        };

        return (
            <>
                <Header />
                <div className="content__overlay"
                    style={{
                        display: this.props.miniCartIsOpen ? "block" : "none",
                        height: window.innerHeight > window.document.body.offsetHeight ?
                            `${window.innerHeight - 80}px` :
                            `${window.document.body.offsetHeight - 80}px`
                    }}>
                </div>
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

const mapStateToProps = (state) => {
    return {
        miniCartIsOpen: state.miniCartIsOpen
    };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(PLP);