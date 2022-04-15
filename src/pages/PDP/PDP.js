import React, { createRef } from "react";
import "./PDP.css";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { addProductToCart } from "../../Redux/actions";
import { GET_PRODUCT_BY_ID } from "../../GraphQL/queries";


class PDP extends React.Component {

    state = {
        mainPic: "",
        attributes: [],
        warning: {
            message: "",
            className: "warning"
        },
        selected: false
    };

    description = createRef();

    getPriceByCurrency = (prices) => {
        if (prices) {
            let price = prices.find(p => (p.currency.symbol === localStorage.getItem('symbol')));
            return price;
        }
    };

    setMainPic = (photo) => {
        this.setState({ mainPic: photo });
    };

    // getAttributeClassName(e) {
    //     if (this.state.selected) {
    //         return e.currentTarget.className = "attribute_item selected"
    //     } else {
    //         return e.currentTarget.className = "attribute_item"
    //     }
    // }

    setAttributes = (e, inStock, type, id, value) => {
        if (inStock) {
            this.setState({
                attributes: [...this.state.attributes, { id: id, type: type, value: value }],
                selected: true
            });
        };
        // this.getAttributeClassName(e)
    };

    addProductToCart = (brand, name, prices, attributes, gallery) => {
        if (attributes.length !== this.state.attributes.length) {
            this.setState({
                warning: {
                    message: "You have to choose attributes first!",
                    className: "warning red"
                }
            });
        } else {
            const product = {
                brand,
                name,
                prices,
                attributes: this.state.attributes,
                gallery
            };
            this.props.addProductToCart(product);
            this.setState({
                warning: {
                    message: "Yay! It's in your cart now!",
                    className: "warning green"
                }
            });
        }
    };

    render() {

        console.log(this.state.attributes);

        return (
            <Query query={GET_PRODUCT_BY_ID} variables={{ id: localStorage.getItem("id") }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(":(");
                    if (data === undefined) return null;
                    const product = data.product;
                    const price = this.getPriceByCurrency(product.prices);
                    const description = product.description;
                    console.log(product);

                    return (
                        <div className="product-info">
                            <div className="gallery">
                                <div className="gallery_mini-pics">
                                    {product.gallery.map(photo => (
                                        <div className="mini-pic" key={photo}>
                                            <img src={photo} alt="" onClick={() => this.setMainPic(photo)} />
                                        </div>
                                    ))}
                                </div>
                                <div className="gallery_main-pic">
                                    <img src={this.state.mainPic === "" ? product.gallery[0] : this.state.mainPic} alt="" />
                                </div>
                            </div>
                            <div className="details">
                                <h1 className="brand">{product.brand}</h1>
                                <h2 className="name">{product.name}</h2>
                                <div className="attributes_all">
                                    {product.attributes.map(a => (
                                        <div className="attributes" key={a.id}>
                                            <p className="attribute_title title">{`${a.name}:`}</p>
                                            <div className="attribute_list">
                                                {a.items.map(item => (
                                                    <div key={item.id}
                                                        className={product.inStock ? "attribute_item" : "attribute_item not-in-stock"}
                                                        style={a.type === "swatch" ? { background: `${item.value}` } : { background: "none" }}
                                                        onClick={(e) => this.setAttributes(e, product.inStock, a.type, item.id, item.value)}>
                                                        {a.type === "swatch" ? "" : item.value}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="price">
                                    <p className="price_title title">PRICE:</p>
                                    <p className="price_value">{price.currency.symbol + price.amount}</p>
                                </div>
                                <button className="btn"
                                    disabled={product.inStock ? false : true}
                                    onClick={() => this.addProductToCart(product.brand, product.name, product.prices, product.attributes, product.gallery)}>
                                    ADD TO CART
                                </button>
                                <p className={this.state.warning.className}>{this.state.warning.message}</p>
                                <div className="description" dangerouslySetInnerHTML={{ __html: description }} />
                            </div>
                        </div>
                    )
                }}
            </Query>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        cart: state.cart
    }
}

const mapDispatchToProps = dispatch => ({
    addProductToCart: (product) => dispatch(addProductToCart(product))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(PDP);