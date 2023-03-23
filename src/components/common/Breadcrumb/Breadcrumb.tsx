import { Link, useLocation } from 'react-router-dom'

import Icon from '../../ui/Icon'

function Breadcrumb() {
  const { pathname } = useLocation()

  const paths = pathname.split('/').filter(Boolean)

  return (
    <div className="h-full flex items-center">
      <Link to="/">
        <Icon name="Home" width={16} height={16} />
      </Link>

      {paths.map((path, index) => {
        const fullPath = `/${paths.slice(0, index + 1).join('/')}`

        return (
          <div key={path}>
            <span className="mx-3 text-label-1 text-black-30">/</span>

            <Link
              key={path}
              className="text-label-1 text-black-30 capitalize"
              to={fullPath}
            >
              {path}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Breadcrumb
