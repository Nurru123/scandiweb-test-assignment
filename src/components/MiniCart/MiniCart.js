import React, { createRef } from "react";
import "./MiniCart.css";
import styled from "styled-components";
import { connect } from "react-redux";
import { removeProductFromCart } from "../../Redux/actions";
import CartItem from "../CartItem/CartItem";
import MiniCartItem from "../MiniCartItem/MiniCartItem";
import { ReactComponent as CartIcon } from "../../pics/cart-icon.svg";

const DropDownContainer = styled("div")`
    position: relative;
`;

const DropDownHeader = styled("div")`
    position: relative;
    padding: 8px 0;
    cursor: pointer;
`;

const Quantity = styled("div")`
    position: absolute;
    bottom: 17px;
    left: 12px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #1D1F22;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 14px;
    color: #FFFFFF;
`;

const DropDownListContainer = styled("div")`
    position: absolute;
    right: -100px;
    top: 48px;
    z-index: 100;
`;

const DropDownList = styled("div")`
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    background: #FFFFFF;
    box-sizing: border-box;
    padding: 32px 16px;
    width: 325px;
    height: fit-content;
    z-index: 1000;
    margin-right: 72px;
`;



class MiniCart extends React.Component {

    state = {
        isOpen: false
    }

    box = createRef();

    changeHandler = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleOutsideClick = (event) => {
        if (this.box && this.state.isOpen && !this.box.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    render() {

        const { cart } = this.props;

        return (
            <DropDownContainer ref={this.box}>
                <DropDownHeader onClick={this.changeHandler}>
                    <CartIcon />
                    {cart.length != 0 && <Quantity>{this.props.totalQty}</Quantity>}
                </DropDownHeader>
                {this.state.isOpen &&
                    <DropDownListContainer>
                        <DropDownList>
                            {cart.length ? cart.map((item, index) => (
                                // <CartItem key={index}
                                //     {...item}
                                //     index={index}
                                //     removeFromCart={this.removeFromCart}
                                // />
                                <MiniCartItem key={index}
                                    {...item}
                                    index={index}
                                    deleteFromCart={this.deleteFromCart}
                                />
                            )) :
                                <p className="message">Your cart is empty :(</p>}
                        </DropDownList>
                    </DropDownListContainer>}
            </DropDownContainer>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        cart: state.cart,
        totalQty: state.totalQty
    }
}

const mapDispatchToProps = dispatch => ({
    removeProductFromCart: (index) => dispatch(removeProductFromCart(index))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(MiniCart);