export function currenciesSwitcher(symbol) {
    return {
        type: 'CURRENCIES_SWITCHER',
        payload: {
            symbol: symbol
        }
    };
};

export function categoriesSwitcher(category) {
    return {
        type: 'CATEGORIES_SWITCHER',
        payload: {
            category: category
        }
    };
};

export function addProductToCart(product) {
    return {
        type: 'ADD_PRODUCT_TO_CART',
        payload: {
            product: product
        }
    };
};

export function removeProductFromCart(product) {
    return {
        type: 'REMOVE_PRODUCT_FROM_CART',
        payload: {
            productToRemove: product
        }
    };
};

export function setAttributes(checkedAttributes) {
    return {
        type: 'SET_ATTRIBUTES',
        payload: {
            checkedAttributes: checkedAttributes
        }
    };
};