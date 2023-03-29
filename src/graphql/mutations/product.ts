import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`
