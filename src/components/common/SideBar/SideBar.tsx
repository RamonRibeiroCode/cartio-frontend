import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../../../contexts/auth'
import Icon from '../../ui/Icon'

const links = [
  {
    name: 'Dashboard',
    href: '/',
  },
  {
    name: 'Orders',
    href: '/orders',
  },
  {
    name: 'Customers',
    href: '/customers',
  },
  {
    name: 'Inventory',
    href: '/inventory',
  },
  {
    name: 'Conversations',
    href: '/conversations',
  },
  {
    name: 'Settings',
    href: '/settings',
  },
]

function SideBar() {
  const location = useLocation()
  const { handleLogout } = useAuth()

  return (
    <div className="flex flex-col w-full max-w-[296px] px-8 pt-4 pb-9">
      <div className="flex items-center mb-16">
        <Icon name="Logo" width={43} height={43} />
        <span className="text-sub-heading-3 font-bold text-black-60 ml-3">
          Cartio
        </span>
      </div>

      <nav className="flex-1">
        <ul>
          {links.map((link) => {
            const active = location.pathname === link.href

            return (
              <li
                key={link.name}
                className={`w-full rounded-lg mb-2 ${
                  active ? 'h-14 bg-primary-100' : ''
                }`}
              >
                <Link
                  className={`h-full flex items-center px-5 ${
                    active ? '' : 'py-4'
                  }`}
                  to={link.href}
                >
                  <Icon
                    name={`${link.name}${active ? 'Active' : ''}`}
                    width={24}
                    height={24}
                  />

                  <span
                    className={`ml-4 text-paragraph-2 ${
                      active ? 'text-white' : ''
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <button
        className="flex items-center w-full h-14 px-4 rounded-lg hover:bg-[#cc5f5f33]"
        onClick={handleLogout}
      >
        <Icon name="Logout" width={24} height={24} />

        <span className="ml-4 text-paragraph-2 text-action-red">Logout</span>
      </button>
    </div>
  )
}

export default SideBar
