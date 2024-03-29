import { Link, useLocation } from 'react-router-dom'

import Icon from '../../ui/Icon'
import { useAuth } from '../../../contexts/auth'
import { useSidebar } from '../../../contexts/sidebar'
import { Logo, DoubleArrowLeft } from '../../../assets/icons/General'
import { Logout } from '../../../assets/icons/Actions'

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
  const { collapsed, setCollapsed } = useSidebar()
  const location = useLocation()
  const { handleLogout } = useAuth()

  return (
    <div
      className={`flex flex-col w-full pt-4 pb-9 ${
        collapsed ? 'max-w-[88px] px-4' : 'max-w-[296px] px-8'
      }`}
    >
      <Link
        to="/"
        className={`flex items-center mb-16 ${
          collapsed ? 'justify-center' : ''
        }`}
      >
        <Logo width={43} height={43} />

        {!collapsed && (
          <span className="text-sub-heading-3 font-bold text-black-60 ml-3">
            Cartio
          </span>
        )}
      </Link>

      <nav className="flex-1">
        <ul>
          {links.map((link) => {
            const active = location.pathname === link.href

            return (
              <li
                key={link.name}
                className={`w-full rounded-lg mb-2 ${
                  active ? 'h-14 bg-primary-100' : 'hover:bg-primary-10'
                } `}
              >
                <Link
                  className={`h-full flex items-center ${
                    collapsed ? 'justify-center items-center' : 'px-5'
                  } ${!active ? 'py-4' : ''}`}
                  to={link.href}
                >
                  <Icon
                    name={`${link.name}${active ? 'Bulk' : ''}`}
                    width={24}
                    height={24}
                  />

                  {!collapsed && (
                    <span
                      className={`ml-4 text-paragraph-2 ${
                        active ? 'text-white' : 'text-black-50'
                      }`}
                    >
                      {link.name}
                    </span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <button
        className={`flex items-center w-full h-14 px-4 rounded-lg hover:bg-primary-10 ${
          collapsed ? 'justify-center' : 'px-4'
        }`}
        onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
      >
        <DoubleArrowLeft
          className={collapsed ? 'rotate-180' : ''}
          width={24}
          height={24}
        />

        {!collapsed && (
          <span className="ml-4 text-paragraph-2 text-black-50">Collapse</span>
        )}
      </button>

      <button
        className={`flex items-center w-full h-14  rounded-lg hover:bg-action-light-red ${
          collapsed ? 'justify-center' : 'px-4'
        }`}
        onClick={handleLogout}
      >
        <Logout width={24} height={24} />

        {!collapsed && (
          <span className="ml-4 text-paragraph-2 text-action-red">Logout</span>
        )}
      </button>
    </div>
  )
}

export default SideBar
