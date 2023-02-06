import { Routes, Route } from 'react-router-dom'

import { Dashboard } from '../pages/Dashboard'

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
  </Routes>
)

export default AuthRoutes
