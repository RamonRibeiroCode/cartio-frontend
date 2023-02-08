import { gql, useQuery } from '@apollo/client'

import { useAuth } from '../../../contexts/auth'
import { UserWithoutPassword } from '../../../__generated__/graphql'
import Breadcrumb from '../../ui/Breadcrumb'

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

interface HeaderProps {
  label: string
}

function Header({ label }: HeaderProps) {
  const { user } = useAuth()
  const { data } = useQuery<ProfileQuery>(PROFILE)
  user
  data

  return (
    <header className="flex flex-col h-20">
      <div className="flex-1 flex justify-between items-center px-5">
        <h1 className="text-sub-heading-3 font-medium text-black-60">
          {label}
        </h1>
      </div>

      <div className="h-6 border-t border-[#F1F3F9] px-5">
        <Breadcrumb />
      </div>
    </header>
  )
}

export default Header
