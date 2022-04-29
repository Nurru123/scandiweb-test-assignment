import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
{
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
{
  currencies {
    symbol
    label
  }
}
`;

export const GET_PRODUCT_BY_ID = gql`
 query product($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
query category($input: CategoryInput ){
  category(input: $input) {
    products {
      id
      brand
      name
      inStock
      gallery
      attributes {
        id
      }
      prices {
        currency {
          symbol
        }
        amount
      }
    }
  }
}
`;