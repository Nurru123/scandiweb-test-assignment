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
        const newQuantity = this.state.quantity + 1;
        this.setState({ quantity: newQuantity });
        console.log('plus')
    }

    minusItem = (index) => {
        const newQuantity = this.state.quantity - 1;
        this.setState({ quantity: newQuantity });
        console.log('minus')
        if (newQuantity <= 0) {
            this.props.deleteFromCart(index);
            console.log('last one!')
        }
    }

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

        const { index, id, brand, name, prices, attributes, gallery, inStock, deleteFromCart } = this.props;
        let price = this.getPriceByCurrency(prices);
        console.log(attributes)

        return (
            <>

                <div className="cart-item">
                    <div className="cart-item__info">
                        <p className="brand">{brand}</p>
                        <p className="name">{name}</p>
                        <p className="price_value">{price.currency.symbol + price.amount}</p>
                        <div className="cart-item__attributes">
                            {attributes.map((a) => (
                                <div className="attributes" key={`${id} ${a.id}`}>
                                    <p className="attributes__title title">{`${a.name}:`}</p>
                                    <div className="attributes__list">
                                        {a.items.map((item, i) => (
                                            <div key={`${id} ${item.id}`}>
                                                <input type='radio' id={`${a.id} ${item.id}`}
                                                    name={a.name + index}
                                                    value={item.value}
                                                    disabled={inStock ? false : true}
                                                    checked={item.selected}
                                                    onChange={this.handleOnChange}
                                                />
                                                <label htmlFor={`${a.id} ${item.id}`}>
                                                    <div className={a.type !== "swatch" ? "attributes__text" : "attributes__color"}
                                                        style={a.type === "swatch" ?
                                                            { background: item.value, border: `1px solid ${item.id === 'White' ? 'black' : item.value}` } :
                                                            null}
                                                    >
                                                        {a.type === "swatch" ? "" : item.value}
                                                    </div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <p className={this.state.warning.className}>{this.state.warning.message}</p> */}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="cart-item__right">
                        <div className="cart-item__quantity">
                            <div className="btn-plus" onClick={this.plusItem}>
                                <Plus />
                            </div>
                            <div className="quantity">{this.state.quantity}</div>
                            <div className="btn-minus" onClick={() => this.minusItem(index)}>
                                <Minus />
                            </div>
                        </div>
                        <div className="cart-item__gallery"></div>
                    </div>
                </div>
                <button className="btn-remove" onClick={() => deleteFromCart(index)}>
                    Remove
                </button>
                <div className="grey-line"></div>
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