import { gql } from '@apollo/client'

import {
  UserWithoutPassword,
  SigninResponse,
} from '../../__generated__/graphql'

export interface UpdateUserResponse {
  updateuser: UserWithoutPassword
}

export const UPDATE_USER = gql`
  mutation UPDATE_USER($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      email
      name
      address
      phone
      state
      city
    }
  }
`

export interface SigninQuery {
  signin: SigninResponse
}

export const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      email
      name
      token
    }
  }
`
