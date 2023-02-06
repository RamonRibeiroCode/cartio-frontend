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
import { gql, useMutation } from '@apollo/client'

import { SigninInput, SigninResponse } from '../__generated__/graphql'

const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      email
      token
    }
  }
`
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
  const [signin] = useMutation<SigninResponse, SigninInput>(SIGNIN)

  const navigate = useNavigate()

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const response = await signin({ variables: { email, password } })

      if (!response.data) {
        return
      }

      const user = {
        email: response.data?.email,
        name: response.data?.name,
      }

      setSigned(true)
      setUser(user)
    },
    [signin]
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
