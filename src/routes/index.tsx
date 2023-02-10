import AuthRoutes from './auth.routes'
import SignedRoutes from './signed.routes'
import { useAuth } from '../contexts/auth.jsx'

const Routes = () => {
  const { signed } = useAuth()

  // Loading if user is logged or not
  if (signed === null) {
    return null
  }

  return signed ? <SignedRoutes /> : <AuthRoutes />
}

export default Routes
