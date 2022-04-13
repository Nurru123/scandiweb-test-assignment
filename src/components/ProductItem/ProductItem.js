import React from "react";
import "./ProductItem.css";
import { ReactComponent as CartIcon } from "../../pics/green-cart-icon.svg";

export default class ProductItem extends React.Component {

    state = {
        style: "none"
    }

    handleMouseEnter = () => {
        this.setState({ style: "block" });
    }

    handleMouseLeave = () => {
        this.setState({ style: "none" });
    }

    render() {

        const { brand, gallery, name, inStock, getPrice } = this.props;
        const { style } = this.state;
        let price = getPrice();
        console.log("символ в localstorage" + " " + localStorage.getItem('symbol'));

        return (
            <>
                <div className="product" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    {!inStock && <div className="cover"></div>}
                    <div className="product_img">
                        {!inStock && <p>OUT OF STOCK</p>}
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
                            <CartIcon />
                        </div>}
                </div>
            </>
        )
    }
}
