import { Navigate, Route, Routes } from 'react-router-dom'

import Conversations from '../pages/Conversations'
import Customers from '../pages/Customers'
import Dashboard from '../pages/Dashboard'
import InventoryDetail from '../pages/Inventory/Detail'
import InventoryNew from '../pages/Inventory/New'
import InventorySummary from '../pages/Inventory/Summary'
import Orders from '../pages/Orders'
import Settings from '../pages/Settings'

const AuthRoutes = () => (
  <Routes>
    <Route index element={<Dashboard />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/orders/:id" element={<Orders />} />

    <Route path="/customers" element={<Customers />} />

    <Route path="/inventory" element={<InventorySummary />} />
    <Route path="/inventory/new" element={<InventoryNew />} />
    <Route path="/inventory/:id" element={<InventoryDetail />} />

    <Route path="/conversations" element={<Conversations />} />

    <Route path="/settings" element={<Settings />} />

    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
)

export default AuthRoutes
