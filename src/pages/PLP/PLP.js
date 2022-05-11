import React from "react";
import "./PLP.css";
import { Routes, Route, useParams } from 'react-router-dom';
import { connect } from "react-redux";
import styled from 'styled-components';
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products.js";
import PDP from "../PDP/PDP.js";
import Cart from "../Cart/Cart";

const ContentOverlayStyled = styled.div`
    position: absolute;
    background: rgba(57, 55, 72, 0.22);
    width: 100%;
    z-index: 15;
    display: ${props => props.isOpen ? "block" : "none"};
    height: ${props => props.height};
`;

const ContentOverlay = ({ miniCartIsOpen, height }) => {
    return <ContentOverlayStyled isOpen={miniCartIsOpen} height={height} />;
};

class PLP extends React.Component {

    render() {

        const Wrapper = () => {
            const params = useParams();
            return <PDP {...{ match: { params } }} />
        };

        return (
            <>
                <Header />
                <ContentOverlay miniCartIsOpen={this.props.miniCartIsOpen}
                    height={window.innerHeight > window.document.body.offsetHeight ?
                        `${window.innerHeight - 80}px` :
                        `${window.document.body.offsetHeight - 80}px`}
                />
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Products />} />
                        <Route path="/product/:id" element={<Wrapper />} />
                        <Route path="/cart" element={<Cart />} />
                    </Routes>
                </div>
            </>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        miniCartIsOpen: state.miniCartIsOpen
    };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(PLP);