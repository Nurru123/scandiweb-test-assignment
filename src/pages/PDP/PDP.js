import React, { createRef } from "react";
import "./PDP.css";
import { Query } from "@apollo/client/react/components";
import { gql } from "@apollo/client";
import { connect } from "react-redux";

const productQuery = gql`
 query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`

class PDP extends React.Component {

    state = {
        mainPic: ""
    }

    description = createRef();

    getPriceByCurrency = (prices) => {
        if (prices) {
            let price = prices.find(p => (p.currency.symbol === localStorage.getItem('symbol')));
            return price;
        }
    }

    setMainPic = (photo) => {
        this.setState({ mainPic: photo });
    }

    render() {

        return (
            <Query query={productQuery} variables={{ id: localStorage.getItem("id") }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(":(");
                    if (data === undefined) return null;
                    const product = data.product;
                    const price = this.getPriceByCurrency(product.prices);
                    const description = product.description;
                    console.log(product)
                    console.log(product.description)

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
                                            {a.name === "Color" ? 
                                            <div className="attribute_list">
                                                {a.items.map(item => (
                                                    <div key={item.id} className="attribute_item" style={{ background: `${item.value}` }} />
                                                ))}
                                            </div> :
                                            <div className="attribute_list">
                                                {a.items.map(item => (
                                                    <div  key={item.id} className="attribute_item">
                                                        {item.value}
                                                    </div>
                                                ))}
                                            </div>}
                                        </div>
                                    ))}
                                </div>
                                <div className="price">
                                    <p className="price_title title">PRICE:</p>
                                    <p className="price_value">{price.currency.symbol + price.amount}</p>
                                </div>
                                <button className="btn" disabled={product.inStock ? false : true}>ADD TO CART</button>
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
        symbol: state.symbol
    }
}

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(PDP);