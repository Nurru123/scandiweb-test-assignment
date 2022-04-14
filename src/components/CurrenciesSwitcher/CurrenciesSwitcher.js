import React, { createRef } from "react";
import "./CurrenciesSwitcher.css";
import styled from "styled-components";
import { connect } from 'react-redux';
import { currenciesSwitcher } from "../../Redux/actions";
import { GET_CURRENCIES } from "../../GraphQL/queries";
import { Query } from "@apollo/client/react/components";
import { ReactComponent as Vector } from "../../pics/header-vector.svg";

const DropDownContainer = styled("div")`
    position: relative;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
    color: #1D1F22;
`;
const DropDownHeader = styled("div")`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
`;
const DropDownListContainer = styled("div")`
    position: absolute;
    width: 114px;
    z-index: 1000;
`;
const DropDownList = styled("ul")`
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
    background: #FFFFFF;
`;
const ListItem = styled("li")`
    padding: 10px 20px;
    list-style: none;
    transition: 300ms;
    cursor: pointer;
    &:hover {
        color: #5ECE7B;
    }
`;

class CurrenciesSwitcher extends React.Component {

    state = {
        symbol: '$',
        isOpen: false,
        deg: 0
    }

    box = createRef();

    changeHandler = () => {
        this.state.deg === 0 ?
            this.setState({ isOpen: !this.state.isOpen, deg: -180 }) : this.setState({ isOpen: !this.state.isOpen, deg: 0 });
    }

    optionClickHandler = (symbol) => {
        this.setState({ symbol, isOpen: false });
        this.props.currenciesSwitcher(symbol);
        localStorage.setItem('symbol', symbol);
    }

    handleOutsideClick = (event) => {
        if (this.box && this.state.isOpen && !this.box.current.contains(event.target)) {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleOutsideClick);
        this.setState({ symbol: localStorage.getItem('symbol')})
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleOutsideClick);
    }

    render() {

        return (
            <Query query={GET_CURRENCIES} >
                {({ loading, error, data }) => {
                    if (loading) return null;
                    if (error) return console.log(error);
                    return (
                        <DropDownContainer ref={this.box}>
                            <DropDownHeader onClick={this.changeHandler}>
                                <div className="symbol">{this.state.symbol}</div>
                                <div className="vector" style={{ transform: `rotate(${this.state.deg}deg)` }}>
                                    <Vector />
                                </div>
                            </DropDownHeader>
                            {this.state.isOpen &&
                                <DropDownListContainer>
                                    <DropDownList>
                                        {data.currencies.map(currency => (
                                            <ListItem key={currency.label} onClick={() => this.optionClickHandler(currency.symbol)}>{currency.symbol + ' ' + currency.label}</ListItem>
                                        ))}
                                    </DropDownList>
                                </DropDownListContainer>}
                        </DropDownContainer>
                    )
                }}
            </Query >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        symbol: state.symbol
    }
}

const mapDispatchToProps = dispatch => ({
    currenciesSwitcher: (symbol) => dispatch(currenciesSwitcher(symbol))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(CurrenciesSwitcher);