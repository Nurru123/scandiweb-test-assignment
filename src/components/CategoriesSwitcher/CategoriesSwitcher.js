import React from "react";
import "./CategoriesSwitcher.css"
import { GET_CATEGORIES } from "../../GraphQL/queries";
import { Query } from '@apollo/client/react/components';
import { connect } from 'react-redux';
import { categoriesSwitcher } from "../../Redux/actions";

class CategoriesSwitcher extends React.Component {

    categoryClickHandler = (category) => {
        this.props.categoriesSwitcher(category);
    }

    render() {

        console.log("категория в store" + " " + this.props.category);

        return (
            <Query query={GET_CATEGORIES}>
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    if (data.categories === undefined) return null;
                    return (
                        <nav className="categories">
                            {data.categories.map(category => (
                                <div key={category.name}
                                    className={(this.props.category === category.name) ? "category clicked" : "category"}
                                    onClick={() => this.categoryClickHandler(category.name)}>
                                    {category.name}
                                </div>
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