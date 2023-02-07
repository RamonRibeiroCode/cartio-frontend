import { ApolloError } from '@apollo/client'
import { useState } from 'react'

import { useAuth } from '../contexts/auth'

const Login = () => {
  const [email, setEmail] = useState('ramonzin@gmail.com')
  const [password, setPassword] = useState('123')
  const [error, setError] = useState('')

  const { handleLogin: login } = useAuth()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await login(email, password)
    } catch (error) {
      if (error instanceof ApolloError) {
        setError(error.message)
      }
    }
  }

  return (
    <div>
      <h1 className="text-primary-black font-bold">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {error && <span>{error}</span>}
    </div>
  )
}

export { Login }
