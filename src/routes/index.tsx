import AuthRoutes from './auth.routes'
import SignedRoutes from './signed.routes'
import { useAuth } from '../contexts/auth.jsx'
import Layout from '../components/common/Layout'

const Routes = () => {
  const { signed, loading } = useAuth()

  if (loading) {
    return null
  }

  return signed ? (
    <Layout>
      <SignedRoutes />
    </Layout>
  ) : (
    <AuthRoutes />
  )
}

export default Routes
