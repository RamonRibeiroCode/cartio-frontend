import { Link } from 'react-router-dom'

import { useAuth } from '../../../contexts/auth'
import Breadcrumb from '../../ui/Breadcrumb'
import Profile from '../../../assets/profile.png'

interface HeaderProps {
  label: string
}

function Header({ label }: HeaderProps) {
  const { user } = useAuth()

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

          <img src={Profile} alt="" />
        </Link>
      </div>

      <div className="h-6 border-t border-[#F1F3F9] px-5">
        <Breadcrumb />
      </div>
    </header>
  )
}

export default Header
