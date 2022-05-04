import React from "react";
import "./ProductItem.css";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { addProductToCart } from "../../Redux/actions";
import { ReactComponent as CartIcon } from "../../pics/green-cart-icon.svg";

class ProductItem extends React.Component {

    state = {
        message: ""
    };

    timer;

    addToCart = (product) => {
        let updatedProduct = {};
        if (product.attributes.length === 0) {
            updatedProduct = {
                ...product,
                qty: 1,
                id: `${product.id} `
            };
            this.props.addProductToCart(updatedProduct);
        } else {
            const updatedAttributes = product.attributes.map(a => {
                return {
                    ...a,
                    items: a.items.map((item, index) => {
                        return index === 0 ? { ...item, selected: true } : { ...item, selected: false }
                    })
                };
            });
            const selectedAttribute = updatedAttributes.map(a => (
                a.items.find(i => i.selected === true)
            ));
            updatedProduct = {
                ...product,
                attributes: updatedAttributes,
                qty: 1,
                id: `${product.id} ${selectedAttribute.map(i => i.id).join(" ")}`
            };
            this.props.addProductToCart(updatedProduct);
        };
        this.setState({ message: "Yay! It's in your bag!" });
        this.timer = setTimeout(() => {
            this.setState({ message: "" });
        }, 3000);
    };

    componentWillUnmount() {
        clearTimeout(this.timer);
    };

    render() {

        const { id, brand, gallery, name, inStock, getPrice } = this.props;
        const { message } = this.state;
        let price = getPrice();

        return (
            <>
                <div className="product" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <Link to={`/product/${id}`}>
                        {!inStock || message ? <div className="cover"></div> : null}
                        <div className="product_img">
                            {!inStock && <p className="out-of-stock">Out of stock</p>}
                            {message ? <div className="popup">{message}</div> : null}
                            <img src={gallery[0]} alt="" />
                        </div>
                        <div className="product_title">
                            {brand + " " + name}
                        </div>
                        <div className="product_price">
                            {price.currency.symbol + price.amount}
                        </div>
                    </Link>
                    {inStock &&
                        <div className="green-cart" >
                            <CartIcon onClick={() => this.addToCart(this.props)} />
                        </div>}
                </div>
            </>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    };
};

const mapDispatchToProps = dispatch => ({
    addProductToCart: (product) => dispatch(addProductToCart(product))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ProductItem);
