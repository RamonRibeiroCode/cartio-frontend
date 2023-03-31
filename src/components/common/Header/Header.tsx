import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Breadcrumb from '../Breadcrumb'
import { useAuth } from '../../../contexts/auth'
import { PROFILE, ProfileQuery } from '../../../graphql/queries/user'
import { ImageBulk } from '../../../assets/icons/Profile'

function Header() {
  const { user } = useAuth()
  const { data } = useQuery<ProfileQuery>(PROFILE)
  const { pathname } = useLocation()

  const label = pathname.split('/').at(1)

  return (
    <header className="flex flex-col h-20">
      <div className="flex-1 flex justify-between items-center px-5 border-b border-[#F1F3F9]">
        <h1 className="text-sub-heading-3 font-medium text-black-60 capitalize">
          {label || 'Dashboard'}
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
              <div className="flex justify-center items-center w-8 h-8 rounded-md bg-[#F4F5FA]">
                <ImageBulk width={24} height={24} />
              </div>
            )}
          </div>
        </Link>
      </div>

      <div className="h-6 px-5">
        <Breadcrumb pathname={pathname} />
      </div>
    </header>
  )
}

export default Header
