import { gql } from '@apollo/client'

import { UserWithoutPassword } from '../../__generated__/graphql'

export interface ProfileQuery {
  profile: UserWithoutPassword
}

export const PROFILE = gql`
  query PROFILE {
    profile {
      email
      name
      phone
      address
      state
      city
      imageUrl
    }
  }
`
