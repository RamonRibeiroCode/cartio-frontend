import { gql, useQuery } from '@apollo/client'

import { useAuth } from '../../contexts/auth'
import { UserWithoutPassword } from '../../__generated__/graphql'

const PROFILE = gql`
  query PROFILE {
    profile {
      name
    }
  }
`

interface ProfileQuery {
  profile: UserWithoutPassword
}

const Header = () => {
  const { user, handleLogout } = useAuth()
  const { data } = useQuery<ProfileQuery>(PROFILE)

  console.log(data?.profile.__typename)

  return (
    <header>
      <span>{user.email}</span>

      <span>{user.name}</span>

      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export { Header }
