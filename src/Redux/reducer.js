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
            let newState = {};
            if (item) {
                newState = {
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
                // localStorage.setItem("cart", JSON.stringify(newState.cart));
                return newState;
            };
            newState = {
                ...state,
                cart: [...state.cart, product],
                totalQty: state.cart.reduce((acc, item) => {
                    return acc + item.qty
                }, 1)
            };
            // localStorage.setItem("cart", JSON.stringify(newState.cart));
            return newState;
        case 'REMOVE_PRODUCT_FROM_CART':
            const { productToRemove } = action.payload;
            const itemToRemove = state.cart.find(
                product => product.id === productToRemove.id,
            );
            let updatedState = {};
            if (itemToRemove.qty <= 1) {
                updatedState = {
                    ...state,
                    cart: state.cart.filter(item => item.id !== productToRemove.id),
                    totalQty: state.totalQty - 1
                };
                // localStorage.setItem("cart", JSON.stringify(updatedState.cart));
                return updatedState;
            } else {
                updatedState = {
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
                // localStorage.setItem("cart", JSON.stringify(updatedState.cart));
                return updatedState;
            };
        case 'SET_MINI-CART_IS_OPEN':
            return { ...state, miniCartIsOpen: !state.miniCartIsOpen };
        default:
            return state;
    };
};

