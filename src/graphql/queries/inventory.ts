import { gql } from '@apollo/client'

import { Product } from '../../__generated__/graphql'

export interface ProductsQuery {
  products: Product[]
}

export const PRODUCTS = gql`
  query PRODUCTS {
    products {
      id
      categoryId
      expiresIn
      listPrice
      name
      sellingPrice
      quantity
      slug
      status
      validIn

      category {
        id
        name
      }
    }
  }
`
