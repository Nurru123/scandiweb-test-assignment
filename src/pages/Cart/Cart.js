import React from "react";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem.js";
import { connect } from "react-redux";
import { deleteProductFromCart } from "../../Redux/actions";

class Cart extends React.Component {

    deleteFromCart = (index) => {
        this.props.deleteProductFromCart(index);
    }

    getTotalPrice = () => {

    }

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
                        {cart.map((item, index) => (
                            <CartItem key={index} 
                            {...item} 
                            index={index} 
                            deleteFromCart={this.deleteFromCart} 
                            />
                        ))}
                    </div>
                }
                <div className="cart__result">
                    <div className="tax">Tax: <p>{'0.00'}{localStorage.getItem('symbol')}</p></div>
                    <div className="qty">Qty: <p>{cart.length}</p></div>
                    <div className="total">Total: <p>{localStorage.getItem('symbol')}{'0.00'}</p></div>
                </div>
                <button className="cart__btn btn-add">Order</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => ({
    deleteProductFromCart: (index) => dispatch(deleteProductFromCart(index))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Cart);