import React from "react";
import { GET_CATEGORIES } from "../GraphQL/queries";

export default class TestComponent extends React.Component {

    state = {
        data: null
    }

    componentDidMount() {
        
        console.log(this.state.data)
        console.log(this.props.id)

        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `
                     {
                        product(id: ${this.props.id}) {
                            prices {
                            currency {
                                label
                                symbol
                            }
                            amount
                            }
                        }
                    }
                `
            }),
            variables: {}
        })
            .then(res => res.json())
            .then(data => this.setState({ data }))
    }

    render() {

        
        if(this.state.data === null) return null

        return (
            <></>
        )
    }
}