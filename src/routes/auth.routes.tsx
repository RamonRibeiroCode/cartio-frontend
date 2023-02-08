import { Routes, Route } from 'react-router-dom'

import Login from '../pages/Login'

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
  </Routes>
)

export default AuthRoutes
