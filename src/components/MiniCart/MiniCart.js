import React, { createRef } from "react";
import "./MiniCart.css";
import { connect } from "react-redux";
import { removeProductFromCart, addProductToCart, setMiniCartIsOpen, checkout } from "../../Redux/actions";
import { Link } from 'react-router-dom';
import MiniCartItem from "../MiniCartItem/MiniCartItem";
import { ReactComponent as CartIcon } from "../../pics/cart-icon.svg";


class MiniCart extends React.Component {

    state = {
        isOpen: false
    };

    box = createRef();

    changeHandler = () => {
        this.setState({ isOpen: !this.state.isOpen });
        this.props.setMiniCartIsOpen();
    };

    handleOutsideClick = (event) => {
        if (this.box && this.state.isOpen && !this.box.current.contains(event.target)) {
            this.setState({ isOpen: false });
            this.props.setMiniCartIsOpen();
        };
    };

    getTotalPrice = () => {
        const totalPrice = this.props.cart.reduce((acc, item) => {
            if (item.prices && localStorage.getItem('symbol')) {
                let price = item.prices.find(p => (p.currency.symbol === localStorage.getItem('symbol')));
                return acc + price.amount * item.qty;
            } else {
                let price = item.prices.find(p => (p.currency.symbol === '$'));
                return acc + price.amount * item.qty;
            }
        }, 0);
        return Math.round(totalPrice * 100) / 100;
    };

    removeFromCart = (product) => {
        this.props.removeProductFromCart(product);
    };

    addToCart = (product) => {
        this.props.addProductToCart(product);
    };

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    };

    render() {

        const { cart } = this.props;

        return (
            <div className="mini-cart__container" ref={this.box}>
                <div className="mini-cart__header" onClick={this.changeHandler}>
                    <CartIcon />
                    {cart.length !== 0 &&
                        <div className="mini-cart__quantity">{this.props.totalQty}</div>}
                </div>
                {this.state.isOpen &&
                    <div className="mini-cart__list-container">
                        <div className="mini-cart__list">
                            <div className="mini-cart__title">
                                <b>My Bag,</b> {this.props.totalQty} items
                            </div>
                            <div>
                                {!cart.length ?
                                    <p className="message">Your cart is empty :(</p> :
                                    cart.map((item, index) => (
                                        <MiniCartItem key={index}
                                            {...item}
                                            index={index}
                                            removeFromCart={this.removeFromCart}
                                            addToCart={this.addToCart}
                                        />
                                    ))}
                            </div>
                            <div className="mini-cart__total-price">
                                <p>Total</p>
                                <p>
                                    {localStorage.getItem('symbol') ? localStorage.getItem('symbol') : "$"}
                                    {this.getTotalPrice()}
                                </p>
                            </div>
                            <div className="mini-cart__btns">
                                <Link to={"/cart"}>
                                    <button className="btn-view mini-cart__btn" onClick={this.changeHandler}>View bag</button>
                                </Link>
                                <button className="btn-checkout mini-cart__btn" onClick={() => this.props.checkout()}>Checkout</button>
                            </div>
                        </div>
                    </div>}
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        cart: state.cart,
        totalQty: state.totalQty,
        miniCartIsOpen: state.miniCartIsOpen
    };
};

const mapDispatchToProps = dispatch => ({
    removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
    addProductToCart: (product) => dispatch(addProductToCart(product)),
    setMiniCartIsOpen: () => dispatch(setMiniCartIsOpen()),
    checkout: () => dispatch(checkout())
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(MiniCart);