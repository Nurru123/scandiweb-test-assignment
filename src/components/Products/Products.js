import React from "react";
import "./Products.css";
import { Query } from "@apollo/client/react/components";
import { connect } from "react-redux";
import CategoryName from "../CategoryName/CategoryName";
import ProductItem from "../ProductItem/ProductItem.js";
import { GET_PRODUCTS_BY_ALL } from "../../GraphQL/queries";
import { GET_PRODUCTS_BY_CLOTHES } from "../../GraphQL/queries";
import { GET_PRODUCTS_BY_TECH } from "../../GraphQL/queries";


class Products extends React.Component {
    
    getCategory = () => {
        if (this.props.category === "all") {
            return GET_PRODUCTS_BY_ALL;
        } else if (this.props.category === "clothes") {
            return GET_PRODUCTS_BY_CLOTHES;
        } else if (this.props.category === "tech") {
            return GET_PRODUCTS_BY_TECH;
        }
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

        const queryByCategory = this.getCategory();

        return (
            <Query query={queryByCategory}>
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
    }
}

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol,
        category: state.category
    }
};

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(Products);