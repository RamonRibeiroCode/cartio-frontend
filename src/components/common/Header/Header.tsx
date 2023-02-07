import { gql, useQuery } from '@apollo/client'

import { useAuth } from '../../../contexts/auth'
import { UserWithoutPassword } from '../../../__generated__/graphql'

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

function Header() {
  const { user, handleLogout } = useAuth()
  const { data } = useQuery<ProfileQuery>(PROFILE)

  console.log(data?.profile.__typename)

  return (
    <header className="h-20 border-b border-red-600">
      <span>{user.email}</span>

      <span>{user.name}</span>

      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export default Header
