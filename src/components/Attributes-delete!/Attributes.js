import React from "react";
import "./Attributes.css";
import { connect } from "react-redux";
import { setAttributes } from "../../Redux/actions";

class Attributes extends React.Component {

    state = {
        attributes: [],
        warning: {
            message: "pook",
            className: "warning"
        }
    }

    handleOnChange = ({ target }) => {
        console.log('lol')
        const { attributes } = this.state;
        const nextState = attributes.map(a => {
            if (a.name !== target.name) return a;
            return {
                ...a,
                items: a.items.map(item => {
                    const checked = item.value === target.value;
                    return {
                        ...item,
                        selected: checked
                    }
                })
            }
        })
        this.setState({
            attributes: nextState
        });
        this.props.setAttributes(nextState)
    }

    componentDidMount() {
        let attributes = this.props.allAttributes.map(a => {
            return {
                ...a,
                items: a.items.map(item => {
                    return {
                        ...item,
                        selected: ''
                    }
                })
        }})
        this.setState({
            attributes: attributes
        })
    }

    render() {

        const { id, name, items, type, inStock, index } = this.props;
        console.log(this.state.attributes)
        // console.log(this.state.radioChecked)

        return (
            <div className="attributes">
                <p className="attribute_title title">{`${name}:`}</p>
                <div className="attribute_list">
                    {items.map((item, i) => (
                        <div key={`${id} ${item.id}`}>
                            <input type='radio' id={`${id} ${item.id}`}
                                name={name}
                                value={item.value}
                                disabled={inStock ? false : true}
                                checked={item.selected}
                                onChange={this.handleOnChange}
                            />
                            <label htmlFor={`${id} ${item.id}`}>
                                <div className={inStock ? "attribute_item" : "attribute_item not-in-stock"}
                                    style={type === "swatch" ? { background: `${item.value}` } : null}
                                >
                                    {type === "swatch" ? "" : item.value}
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
                <p className={this.state.warning.className}>{this.state.warning.message}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        cartAttributes: state.cartAttributes
    }
};

const mapDispatchToProps = dispatch => ({
    setAttributes: (checkedAttributes) => dispatch(setAttributes(checkedAttributes))
});

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Attributes);