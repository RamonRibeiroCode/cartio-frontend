import { ReactNode } from 'react'

import Header from '../Header'
import SideBar from '../SideBar'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen">
      <SideBar />

      <div className="flex flex-col flex-1">
        <Header />

        <main className="flex flex-col h-[calc(100vh_-_80px)] overflow-y-auto bg-[#F4F5FA] p-5">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
