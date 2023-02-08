import { Link } from 'react-router-dom'

import Icon from '../Icon'

function Breadcrumb() {
  return (
    <div className="h-full flex items-center">
      <Link to="/">
        <Icon name="Home" width={16} height={16} />
      </Link>
    </div>
  )
}

export default Breadcrumb
