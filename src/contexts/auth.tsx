import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useMemo,
  useCallback,
} from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthContext {
  signed: boolean
  loading: boolean
  user: User
  handleLogin: (email: string, password: string) => Promise<void>
  handleLogout: () => void
}

interface User {
  name: string
  email: string
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({} as User)

  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      email
      password
      // const user = await login(email, password);

      setSigned(true)
      setUser(user)
    },
    [user]
  )

  const handleLogout = useCallback(() => {
    localStorage.clear()

    setSigned(false)
    navigate('/')
  }, [navigate])

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true)

      const storagedUser = localStorage.getItem('user')
      const storagedToken = localStorage.getItem('token')

      if (storagedUser && storagedToken) {
        // api.defaults.headers.common.authorization = `Bearer ${storagedToken}`;
        const storagedUserParsed = JSON.parse(storagedUser)

        setUser(storagedUserParsed)
        setSigned(true)
      }

      setLoading(false)
    }

    loadStoragedData()
  }, [])

  const value = useMemo(
    () => ({
      signed: signed,
      loading: loading,
      user,
      handleLogin,
      handleLogout,
    }),
    [handleLogin, handleLogout, loading, signed, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
