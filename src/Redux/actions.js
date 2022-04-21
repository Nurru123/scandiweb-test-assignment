export function currenciesSwitcher(symbol) {
    return {
        type: 'CURRENCIES_SWITCHER',
        payload: {
            symbol: symbol
        }
    }
}

export function categoriesSwitcher(category) {
    return {
        type: 'CATEGORIES_SWITCHER',
        payload: {
            category: category
        }
    }
}

export function addProductToCart(product) {
    return {
        type: 'ADD_PRODUCT_TO_CART',
        payload: {
          product: product
        }
      }
}

export function deleteProductFromCart(index) {
    return {
        type: 'DELETE_PRODUCT_FROM_CART',
        payload: {
            index: index
        }
    }
}

export function setAttributes(checkedAttributes) {
    return {
        type: 'SET_ATTRIBUTES',
        payload: {
            checkedAttributes: checkedAttributes
        }
    }
}