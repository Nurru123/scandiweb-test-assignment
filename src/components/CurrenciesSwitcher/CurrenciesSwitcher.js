import React, { createRef } from "react";
import "./CurrenciesSwitcher.css";
import { connect } from 'react-redux';
import styled from 'styled-components';
import { currenciesSwitcher } from "../../Redux/actions";
import { GET_CURRENCIES } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";
import { ReactComponent as Vector } from "../../pics/header-vector.svg";

const StyledVectorCover = styled.div`
    display: flex;
    align-items: center;
    transition: 300ms;
    transform: rotate(${props => props.rotate}deg);
`;

const VectorCover = ({ rotate }) => {
    return <StyledVectorCover rotate={rotate}>
        <Vector />
    </StyledVectorCover>
};

class CurrenciesSwitcher extends React.Component {

    state = {
        symbol: '$',
        isOpen: false
    };

    box = createRef();

    changeHandler = () => {
        this.setState({ isOpen: !this.state.isOpen });
    };

    optionClickHandler = (symbol) => {
        this.setState({ symbol, isOpen: false });
        this.props.currenciesSwitcher(symbol);
        localStorage.setItem('symbol', symbol);
    };

    handleOutsideClick = (event) => {
        if (this.box && this.state.isOpen && !this.box.current.contains(event.target)) {
            this.setState({ isOpen: false });
        };
    };

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
        if (localStorage.getItem('symbol')) {
            this.setState({ symbol: localStorage.getItem('symbol') })
        };
    };

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    };

    render() {

        return (
            <Query query={GET_CURRENCIES} >
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    return (
                        <div className="currency__container" ref={this.box}>
                            <div className="currency__header" onClick={this.changeHandler}>
                                <div className="symbol">{this.state.symbol}</div>
                                <VectorCover rotate={this.state.isOpen ? -180 : 0} />
                            </div>
                            {this.state.isOpen &&
                                <div className="currency__list-container">
                                    <ul className="currency__list">
                                        {data.currencies.map(currency => (
                                            <li className="currency__list-item" key={currency.label}
                                                onClick={() => this.optionClickHandler(currency.symbol)}>
                                                {currency.symbol + ' ' + currency.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>}
                        </div>
                    )
                }}
            </Query >
        )
    };
};

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol
    };
};

const mapDispatchToProps = dispatch => ({
    currenciesSwitcher: (symbol) => dispatch(currenciesSwitcher(symbol))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CurrenciesSwitcher);