import React from "react";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem.js";
import { connect } from "react-redux";
import { removeProductFromCart, addProductToCart } from "../../Redux/actions";

class Cart extends React.Component {

    removeFromCart = (product) => {
        this.props.removeProductFromCart(product);
    };

    addToCart = (product) => {
        this.props.addProductToCart(product);
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

    getTax = () => {
        const tax = this.getTotalPrice() / 100 * 12;
        return Math.round(tax * 10) / 10;
    };

    render() {

        const { cart } = this.props;

        return (
            <div className="cart">
                <h1 className="cart__title">Cart</h1>
                <div className="grey-line"></div>
                {!cart.length ?
                    <>
                        <p className="message">Your cart is empty :(</p>
                        <div className="grey-line"></div>
                    </> :
                    <div className="cart__list">
                        {JSON.parse(localStorage.getItem("cart")).map((item, index) => (
                            <CartItem key={index}
                                {...item}
                                index={index}
                                removeFromCart={this.removeFromCart}
                                addToCart={this.addToCart}
                            />
                        ))}
                    </div>
                }
                <div className="cart__result">
                    <div className="tax">Tax:
                        <p>
                            {localStorage.getItem('symbol') ? localStorage.getItem('symbol') : "$"}
                            {this.getTax()}
                        </p>
                    </div>
                    <div className="qty">Qty:
                        <p>{this.props.totalQty}</p>
                    </div>
                    <div className="total">Total:
                        <p>
                            {localStorage.getItem('symbol') ? localStorage.getItem('symbol') : "$"}
                            {this.getTotalPrice()}
                        </p>
                    </div>
                </div>
                <button className="cart__btn btn-add">Order</button>
            </div>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        cart: state.cart,
        totalQty: state.totalQty
    };
};

const mapDispatchToProps = dispatch => ({
    removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
    addProductToCart: (product) => dispatch(addProductToCart(product))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Cart);