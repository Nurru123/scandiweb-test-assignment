import React from "react";
import { Link } from 'react-router-dom';
import "./ProductItem.css";
import { ReactComponent as CartIcon } from "../../pics/green-cart-icon.svg";
import { connect } from "react-redux";
import { addProductToCart } from "../../Redux/actions";

class ProductItem extends React.Component {

    state = {
        style: "none"
    };

    handleMouseEnter = () => {
        this.setState({ style: "block" });
    }

    handleMouseLeave = () => {
        this.setState({ style: "none" });
    }

    storeId = () => {
        localStorage.setItem("id", this.props.id);
    }

    addToCart = (product) => {
        if (product.attributes.length === 0) {
            this.props.addProductToCart(product)
        }
    }

    render() {

        const { id, brand, gallery, name, inStock, getPrice } = this.props;
        const { style } = this.state;
        let price = getPrice();

        return (
            <>
                <div className="product" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} onClick={this.storeId}>
                    <Link to={`/${id}`} style={{ textDecoration: "none" }}>
                        {!inStock && <div className="cover"></div>}
                        <div className="product_img">
                            {!inStock && <p className="out-of-stock">OUT OF STOCK</p>}
                            <img src={gallery[0]} alt="" />
                        </div>
                        <div className="product_title">
                            {brand + " " + name}
                        </div>
                        <div className="product_price">
                            {price.currency.symbol + price.amount}
                        </div>
                        {inStock &&
                            <div className="green-cart" style={{ display: `${style}` }}>
                                <CartIcon onClick={() => this.addToCart(this.props)}/>
                            </div>}
                    </Link>
                </div>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
};

const mapDispatchToProps = dispatch => ({
    addProductToCart: (product) => dispatch(addProductToCart(product))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ProductItem);
