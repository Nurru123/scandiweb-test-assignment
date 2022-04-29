import React from "react";
import "./CartItem.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "../Slider/Slider.js";

class CartItem extends React.Component {

    plusItem = (product) => {
        this.props.addToCart(product);
    };

    minusItem = (product) => {
        this.props.removeFromCart(product);
    };

    getPriceByCurrency = (prices) => {
        if (prices && localStorage.getItem('symbol')) {
            let price = prices.find(p => (p.currency.symbol === localStorage.getItem('symbol')));
            return price;
        } else {
            let price = prices.find(p => (p.currency.symbol === '$'));
            return price;
        };
    };

    render() {

        const { index, id, brand, name, prices, attributes, gallery, qty } = this.props;
        let price = this.getPriceByCurrency(prices);

        return (
            <>
                <div className="cart-item">
                    <div className="cart-item__info">
                        <Link to={`/product/${id}`}>
                            <p className="brand">{brand}</p>
                            <p className="name">{name}</p>
                        </Link>
                        <p className="price_value">{price.currency.symbol + price.amount}</p>
                        <div className="cart-item__attributes">
                            {attributes.map((a) => (
                                <div className="attributes" key={`${id} ${a.id}`}>
                                    <p className="cart-item__attributes-title attributes__title title">{`${a.name}:`}</p>
                                    <div className="attributes__list">
                                        {a.items.map(item => (
                                            <div key={`${id} ${item.id}`}>
                                                <input type='radio' id={`${a.id} ${item.id}`}
                                                    name={a.name + index}
                                                    value={item.value}
                                                    checked={item.selected}
                                                    readOnly
                                                />
                                                <label htmlFor={`${a.id} ${item.id}`}>
                                                    <div className={a.type !== "swatch" ?
                                                        "attributes__text cart-item__attributes-text" :
                                                        "attributes__color cart-item__attributes-color"}
                                                        style={a.type === "swatch" ?
                                                            {
                                                                background: item.value,
                                                                border: `1px solid ${item.id === 'White' ? 'black' : item.value}`
                                                            } :
                                                            null}
                                                    >
                                                        {a.type === "swatch" ? "" : item.value}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cart-item__right">
                        <div className="cart-item__quantity">
                            <div className="btn-plus" onClick={() => this.plusItem(this.props)}>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="quantity">{qty}</div>
                            <div className="btn-minus" onClick={() => this.minusItem(this.props)}>
                                <span></span>
                            </div>
                        </div>
                        <div className="cart-item__gallery">
                            <Slider gallery={gallery} />
                        </div>
                    </div>
                </div>
                <div className="grey-line"></div>
            </>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol
    };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(CartItem);