const initialState = {
    symbol: "",
    category: "all",
    cart: [],
    totalQty: 0,
    miniCartIsOpen: false
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
            const { product } = action.payload;
            const item = state.cart.find(
                cartItem => cartItem.id === product.id
            );
            if (item) {
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === product.id
                        ? {
                            ...item,
                            qty: item.qty + 1,
                        }
                        : item
                    ),
                    totalQty: state.cart.reduce((acc, item) => {
                        return acc + item.qty
                    }, 1)
                };
            };
            return {
                ...state,
                cart: [...state.cart, product],
                totalQty: state.cart.reduce((acc, item) => {
                    return acc + item.qty
                }, 1)
            };
        case 'REMOVE_PRODUCT_FROM_CART':
            const { productToRemove } = action.payload;
            const itemToRemove = state.cart.find(
                product => product.id === productToRemove.id,
            );
            if (itemToRemove.qty <= 1) {
                return {
                    ...state,
                    cart: state.cart.filter(item => item.id !== productToRemove.id),
                    totalQty: state.totalQty - 1
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.map(item => item.id === productToRemove.id
                        ? {
                            ...item,
                            qty: item.qty - 1,
                        }
                        : item
                    ),
                    totalQty: state.totalQty - 1
                };
            };
        case 'SET_MINI-CART_IS_OPEN':
            return { ...state, miniCartIsOpen: !state.miniCartIsOpen };
        default:
            return state;
    };
};

