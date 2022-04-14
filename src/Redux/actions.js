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
