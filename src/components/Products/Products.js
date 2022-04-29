import React from "react";
import "./Products.css";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import { GET_PRODUCTS_BY_CATEGORY } from "../../GraphQL/queries";
import CategoryName from "../CategoryName/CategoryName";
import ProductItem from "../ProductItem/ProductItem.js";


class Products extends React.Component {

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

        return (
            <Query query={GET_PRODUCTS_BY_CATEGORY}
                variables={{ input: { title: this.props.category } }}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(":(");
                    if (data === undefined) return null;
                    data = data.category.products;
                    return (
                        <>
                            <CategoryName />
                            <div className="products">
                                {data.map((product) => (
                                    <ProductItem
                                        key={product.id}
                                        {...product}
                                        getPrice={() => this.getPriceByCurrency(product.prices)}
                                    />
                                ))}
                            </div>
                        </>
                    )
                }}
            </Query>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        category: state.category
    };
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(Products);