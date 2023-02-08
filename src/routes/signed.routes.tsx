import { Routes, Route } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Orders from '../pages/Orders'
import Customers from '../pages/Customers'
import Inventory from '../pages/Inventory'
import Conversations from '../pages/Conversations'
import Settings from '../pages/Settings'

const AuthRoutes = () => (
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/customers" element={<Customers />} />
    <Route path="/inventory" element={<Inventory />} />
    <Route path="/conversations" element={<Conversations />} />
    <Route path="/settings" element={<Settings />} />
  </Routes>
)

export default AuthRoutes
