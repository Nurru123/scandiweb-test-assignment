import React from "react";
import "./PLP.css";
import Header from "../../components/Header/Header";
import Products from "../../components/Products/Products.js";
import CategoryName from "../../components/CategoryName/CategoryName";

export default class PLP extends React.Component {

    render() {

        return (
            <>
            <Header />
            <div className="content">
                <CategoryName />
                <Products />
            </div>
            
            </>
        )
    }
}
