import { Routes, Route, Navigate } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Orders from '../pages/Orders'
import Customers from '../pages/Customers'
import Conversations from '../pages/Conversations'
import Settings from '../pages/Settings'
import InventorySummary from '../pages/Inventory/Summary'
import InventoryNew from '../pages/Inventory/New'

const AuthRoutes = () => (
  <Routes>
    <Route index element={<Dashboard />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/orders/:contactId" element={<Orders />} />

    <Route path="/customers" element={<Customers />} />

    <Route path="/inventory" element={<InventorySummary />} />
    <Route path="/inventory/new" element={<InventoryNew />} />

    <Route path="/conversations" element={<Conversations />} />

    <Route path="/settings" element={<Settings />} />

    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
)

export default AuthRoutes
