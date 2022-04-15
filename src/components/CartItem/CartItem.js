import React from "react";
import "./CartItem.css";
import { connect } from "react-redux";
import { deleteProductFromCart } from "../../Redux/actions";
import { ReactComponent as Plus } from "../../pics/btn-plus.svg";
import { ReactComponent as Minus } from "../../pics/btn-minus.svg";

class CartItem extends React.Component {

    state = {
        quantity: 1
    }

    plusItem = () => {
        this.setState({ quantity: ++this.state.quantity });
    }

    minusItem = () => {
        this.setState({ quantity: --this.state.quantity });
        if (this.state.quantity <= 0) {
            this.props.deleteFromCart(this.props.index);
        }
    }

    getPriceByCurrency = (prices) => {
        if (prices) {
            let price = prices.find(p => (p.currency.symbol === localStorage.getItem('symbol')));
            return price;
        }
    };

    render() {

        const { index, brand, name, prices, attributes, gallery, deleteFromCart } = this.props;
        let price = this.getPriceByCurrency(prices);

        return (
            <>
                <div className="grey-line"></div>
                <div className="cart-item">
                    <div className="cart-item_info">
                        <p className="brand">{brand}</p>
                        <p className="name">{name}</p>
                        <p className="price_value">{price.currency.symbol + price.amount}</p>
                        <div className="attribute_list">
                            {attributes.map(a => {
                                if (a.type === "swatch") {
                                    return <div key={a.id}
                                        className="attribute_item"
                                        style={{ background: `${a.value}` }}></div>
                                }
                                return <div key={a.id} className="attribute_item">{a.value}</div>
                            })}
                        </div>
                    </div>
                    <div className="cart-item_right">
                        <div className="cart-item_quantity">
                            <div className="btn-plus" onClick={this.plusItem}>
                                <Plus />
                            </div>
                            <div className="quantity">{this.state.quantity}</div>
                            <div className="btn-minus" onClick={this.minusItem}>
                                <Minus />
                            </div>
                        </div>
                        <div className="cart-item_gallery"></div>
                    </div>
                </div>
                <button className="btn-remove" onClick={() => deleteFromCart(index)}>
                    Remove
                </button>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        // cart: state.cart
    }
}

const mapDispatchToProps = dispatch => ({
    deleteProductFromCart: (index) => dispatch(deleteProductFromCart(index))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CartItem);