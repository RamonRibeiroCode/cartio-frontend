import { ReactNode } from 'react'

import Header from '../Header'
import SideBar from '../SideBar'

interface LayoutProps {
  label: string
  children: ReactNode
}

function Layout({ label, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex flex-col flex-1">
        <Header label={label} />

        <main className="flex-1 bg-[#F4F5FA] p-5">{children}</main>
      </div>
    </div>
  )
}

export default Layout
