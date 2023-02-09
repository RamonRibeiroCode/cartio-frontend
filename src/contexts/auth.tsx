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

import { MutationSigninArgs, SigninResponse } from '../__generated__/graphql'
import { setAuthApolloClient } from '../lib/apollo'

const SIGNIN = gql`
  mutation SIGNIN($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      email
      name
      token
    }
  }
`
interface AuthContextValues {
  signed: boolean
  loading: boolean
  user: User
  handleLogin: (email: string, password: string) => Promise<void>
  handleLogout: () => void
  handleUpdateUserAuthenticated: (email: string, password: string) => void
}

interface User {
  name: string
  email: string
}

interface AuthProviderProps {
  children: ReactNode
}

interface SigninQuery {
  signin: SigninResponse
}

const AuthContext = createContext({} as AuthContextValues)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [signed, setSigned] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({} as User)
  const [signin] = useMutation<SigninQuery, MutationSigninArgs>(SIGNIN)

  const navigate = useNavigate()

  const handleUpdateUserAuthenticated = (email: string, name: string) => {
    const user = {
      email,
      name,
    }

    localStorage.setItem('cartio:user', JSON.stringify(user))

    setUser(user)
  }

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      const response = await signin({ variables: { email, password } })

      if (!response.data) {
        return
      }

      localStorage.setItem('cartio:user', JSON.stringify(user))
      localStorage.setItem('cartio:token', response.data.signin.token)

      handleUpdateUserAuthenticated(
        response.data.signin.email,
        response.data.signin.name
      )
      setAuthApolloClient(response.data.signin.token)
      setSigned(true)
    },
    [signin, user]
  )

  const handleLogout = useCallback(() => {
    localStorage.clear()

    setSigned(false)
    navigate('/')
  }, [navigate])

  useEffect(() => {
    async function loadStoragedData() {
      setLoading(true)

      const storagedUser = localStorage.getItem('cartio:user')
      const storagedToken = localStorage.getItem('cartio:token')

      if (storagedUser && storagedToken) {
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
      handleUpdateUserAuthenticated,
    }),
    [handleLogin, handleLogout, loading, signed, user]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext
