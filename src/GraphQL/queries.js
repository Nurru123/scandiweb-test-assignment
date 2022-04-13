import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
{
    categories {
      name
    }
  }
`

export const GET_CURRENCIES = gql`
{
  currencies {
    symbol
    label
  }
}
`

export const GET_PRODUCTS_BY_ALL = gql`
{
  category(input: { title: "all" }) {
    products {
      id
      brand
      name
      inStock
      gallery
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
}
`

export const GET_PRODUCTS_BY_CLOTHES = gql`
{
  category(input: { title: "clothes" }) {
    products {
      id
      brand
      name
      inStock
      gallery
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
}
`

export const GET_PRODUCTS_BY_TECH = gql`
{
  category(input: { title: "tech" }) {
    products {
      id
      brand
      name
      inStock
      gallery
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
}
`