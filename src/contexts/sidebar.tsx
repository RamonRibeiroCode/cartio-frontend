import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'

interface SidebarContextValues {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

const SidebarContext = createContext({} as SidebarContextValues)

interface SideBarProviderProps {
  children: ReactNode
}

export const SideBarProvider = ({ children }: SideBarProviderProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const value = {
    collapsed,
    setCollapsed,
  }

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  return useContext(SidebarContext)
}

export default SidebarContext
