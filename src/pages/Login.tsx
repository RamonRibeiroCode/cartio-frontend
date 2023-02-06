import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../contexts/auth'

const Login = () => {
  const [email, setEmail] = useState('lara@gmail.com')
  const [password, setPassword] = useState('321')
  const [error, setError] = useState('')

  const { handleLogin: login } = useContext(AuthContext)

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div>
      <h1>Login</h1>
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

      <Link to="/register">I don{"'"}t have an account</Link>
    </div>
  )
}

export { Login }
