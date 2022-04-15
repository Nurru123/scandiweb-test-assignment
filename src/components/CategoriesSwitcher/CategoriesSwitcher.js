import React from "react";
import "./CategoriesSwitcher.css";
import { Link } from 'react-router-dom';
import { GET_CATEGORIES } from "../../GraphQL/queries";
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { categoriesSwitcher } from "../../Redux/actions";

class CategoriesSwitcher extends React.Component {

    categoryClickHandler = (category) => {
        this.props.categoriesSwitcher(category);
    }

    render() {

        return (
            <Query query={GET_CATEGORIES}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data.categories === undefined) return null;
                    return (
                        <nav className="categories">
                            {data.categories.map(category => (
                                <Link to={"/"} key={category.name} style={{ textDecoration: "none" }}>
                                    <div className={(this.props.category === category.name) ? "category clicked" : "category"}
                                        onClick={() => this.categoryClickHandler(category.name)}>
                                        {category.name}
                                    </div>
                                </Link>
                            ))}
                        </nav>
                    )
                }}
            </Query>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category
    }
}

const mapDispatchToProps = dispatch => ({
    categoriesSwitcher: (category) => dispatch(categoriesSwitcher(category))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CategoriesSwitcher);