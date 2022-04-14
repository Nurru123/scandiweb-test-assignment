const initialState = {
    symbol: "",
    category: "all"
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CURRENCIES_SWITCHER':
            const { symbol } = action.payload;
            return { ...state, symbol };
        case 'CATEGORIES_SWITCHER':
            const { category } = action.payload;
            return { ...state, category };

        default:
            return state;
    }

}