import { gql } from '@apollo/client'

import { Category, Product } from '../../__generated__/graphql'

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
      mainImageUrl

      category {
        id
        name
      }
    }
  }
`

export interface ProductQuery {
  product: Product
}

export const PRODUCT = gql`
  query PRODUCT($id: String!) {
    product(id: $id) {
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
      mainImageUrl
      additionalImageUrls
      createdAt
      category {
        id
        name
      }
    }
  }
`

export interface CategoriesQuery {
  categories: Category[]
}

export const CATEGORIES = gql`
  {
    categories {
      id
      name
    }
  }
`
