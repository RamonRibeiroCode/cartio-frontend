import AuthRoutes from './auth.routes'
import SignedRoutes from './signed.routes'
import { useAuth } from '../contexts/auth.jsx'

const Routes = () => {
  const { signed } = useAuth()

  return signed ? <SignedRoutes /> : <AuthRoutes />
}

export default Routes
