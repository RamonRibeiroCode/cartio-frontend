import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Icon from '../../ui/Icon'
import Breadcrumb from '../Breadcrumb'
import { useAuth } from '../../../contexts/auth'
import { PROFILE, ProfileQuery } from '../../../graphql/queries/user'

interface HeaderProps {
  label: string
}

function Header({ label }: HeaderProps) {
  const { user } = useAuth()
  const { data } = useQuery<ProfileQuery>(PROFILE)

  return (
    <header className="flex flex-col h-20">
      <div className="flex-1 flex justify-between items-center px-5">
        <h1 className="text-sub-heading-3 font-medium text-black-60">
          {label}
        </h1>

        <Link to="/settings" className="flex items-center">
          <span className="mr-4 text-paragraph-2 text-black-100">
            {user.name}
          </span>

          <div className="flex justify-center items-center w-8 h-8">
            {data?.profile.imageUrl ? (
              <img
                className="w-8 rounded-md"
                src={data.profile.imageUrl}
                alt=""
              />
            ) : (
              <div className="flex justify-center items-center w-8 h-8 rounded-md bg-[#eff1f999]">
                <Icon name="Image" width={12} height={12} />
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="h-6 border-t border-[#F1F3F9] px-5">
        <Breadcrumb />
      </div>
    </header>
  )
}

export default Header
