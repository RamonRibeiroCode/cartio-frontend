import { gql } from '@apollo/client'

export const CREATE_PRODUCT = gql`
  mutation CREATE_PRODUCT($createProductInput: CreateProductInput!) {
    createProduct(createProductInput: $createProductInput) {
      id
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: String!
    $updateProductInput: UpdateProductInput!
  ) {
    updateProduct(id: $id, updateProductInput: $updateProductInput) {
      name
    }
  }
`
