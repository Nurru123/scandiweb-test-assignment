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

export function getNewPrice(prices) {
    return {
        type: 'GET_NEW_PRICE',
        payload: {
            prices: prices
        }
    }
}

// export function storePrices(prices) {
//     return {
//         type: 'STORE_PRICES',
//         payload: {
//             prices: prices
//         }
//     }
// }