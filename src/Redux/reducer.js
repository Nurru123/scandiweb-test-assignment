const initialState = {
    symbol: "",
    category: "all",
    price: {}
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CURRENCIES_SWITCHER':
            const { symbol } = action.payload;
            return { ...state, symbol };
        case 'CATEGORIES_SWITCHER':
            const { category } = action.payload;
            return { ...state, category };
        // case 'GET_NEW_PRICE':
        //     const { prices } = action.payload;
        //     if (prices) {
        //         const price = prices.find(price => price.currency.symbol === state.symbol)
        //         const newPrice = [...state.price, price]
        //         console.log(newPrice)
        //         const newState = { ...state, price: newPrice }
        //         return newState;
        //     }

        case 'GET_NEW_PRICE':
            const { prices } = action.payload;
            if (prices) {
                for (let i = 0; i < prices.length; i++) {
                    if (prices[i].currency.symbol === state.symbol) {
                        const newState = { ...state, price: prices[i] };
                        console.log(newState)
                        return newState
                        // return prices[i]
                    }
                }
            }

        default:
            return state;
    }

}