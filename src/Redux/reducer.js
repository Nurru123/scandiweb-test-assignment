const initialState = {
    symbol: "",
    category: "all",
    cart: []
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CURRENCIES_SWITCHER':
            const { symbol } = action.payload;
            return { ...state, symbol };
        case 'CATEGORIES_SWITCHER':
            const { category } = action.payload;
            return { ...state, category };
        case 'ADD_PRODUCT_TO_CART':
            const { product } = action.payload
            const newCart = [...state.cart, product];
            const newState = { ...state, cart: newCart };
            console.log(newState);
            return newState;
        case 'DELETE_PRODUCT_FROM_CART':
            const { index } = action.payload;
            const anotherCart = [...state.cart];
            anotherCart.splice(index, 1);
            const anotherState = { ...state, cart: anotherCart };
            return anotherState;
        default:
            return state;
    }
}