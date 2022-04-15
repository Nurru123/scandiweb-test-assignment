import React from "react";
import "./Cart.css";
import CartItem from "../../components/CartItem/CartItem.js";
import { connect } from "react-redux";
import { deleteProductFromCart } from "../../Redux/actions";

class Cart extends React.Component {

    deleteFromCart = (index) => {
        this.props.deleteProductFromCart(index);
    }

    render() {

        const { cart } = this.props;

        return (
            <>
                <h1 className="cart_title">CART</h1>
                {!cart.length ?
                    <p className="message">Your cart is empty :(</p> :
                    <div className="cart_list">
                        {cart.map((item, index) => (
                            <CartItem key={index} {...item} index={index} deleteFromCart={this.deleteFromCart} />
                        ))}
                    </div>
                }
            </>
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