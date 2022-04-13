import React from "react";
import { connect } from 'react-redux';
import "./CategoryName.css"

class CategoryName extends React.Component {
    render() {
        return (
            <h1 className="category-name">{this.props.category}</h1>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

const functionFromConnect = connect(mapStateToProps, null);

export default functionFromConnect(CategoryName);