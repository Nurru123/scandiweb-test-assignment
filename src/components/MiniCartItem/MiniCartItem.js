import React from "react";
import "./MiniCartItem.css";
import { connect } from "react-redux";

class MiniCartItem extends React.Component {

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
        }
    };

    render() {

        const { index, id, brand, name, prices, attributes, gallery, qty } = this.props;
        let price = this.getPriceByCurrency(prices);

        return (
            <>
                <div className="mini-cart-item">
                    <div className="mini-cart-item__info">
                        <p className="brand">{brand}</p>
                        <p className="name">{name}</p>
                        <p className="price_value">{price.currency.symbol + price.amount}</p>
                        <div className="mini-cart-item__attributes">
                            {attributes.map((a) => (
                                <div className="attributes" key={`${id} ${a.name}`}>
                                    <p className="mini-cart-item__attributes-title">{`${a.name}:`}</p>
                                    <div className="mini-cart-item__attributes-list">
                                        {a.items.map(item => (
                                            <div key={`${id} ${item.id}`}>
                                                <input type='radio' id={`${a.id} ${item.id}`}
                                                    name={a.name + index}
                                                    value={item.value}
                                                />
                                                <label htmlFor={`${a.id} ${item.id}`}>
                                                    <div className={a.type !== "swatch" ?
                                                        "mini-cart-item__attributes-text_" + item.selected :
                                                        "mini-cart-item__attributes-color_" + item.selected}
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
                    <div className="mini-cart-item__right">
                        <div className="mini-cart-item__quantity">
                            <div className="btn-plus" onClick={() => this.plusItem(this.props)}>
                                <span></span>
                                <span></span>
                            </div>
                            <div className="quantity">{qty}</div>
                            <div className="btn-minus" onClick={() => this.minusItem(this.props)}>
                                <span></span>
                            </div>
                        </div>
                        <div className="mini-cart-item__gallery">
                            <img src={gallery[0]} alt="" />
                        </div>
                    </div>
                </div>
            </>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol
    };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(MiniCartItem);