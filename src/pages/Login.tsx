import { ApolloError } from '@apollo/client'
import { useState } from 'react'

import Icon from '../components/ui/Icon'
import Input from '../components/ui/Input'
import { useAuth } from '../contexts/auth'

function Login() {
  const [email, setEmail] = useState('user@cartio.com')
  const [password, setPassword] = useState('cartio')
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
    <div className="flex flex-col min-h-screen">
      <div className="flex items-center px-20 h-20">
        <Icon name="Logo" width={41} height={40} />
      </div>

      <div className="flex justify-center items-center flex-1 bg-[#F4F5FA]">
        <div className="flex flex-col items-center w-full max-w-md bg-white px-9 py-11 rounded-xl">
          <Icon name="Logo" width={51} height={50} />

          <h1 className="mt-8 mb-2 text-xl font-medium">Welcome back!</h1>

          <p className="text-sm text-black-30">Login to your account</p>

          <form
            className="flex flex-col items-center w-full mt-16"
            onSubmit={handleLogin}
          >
            <Input
              wrapperClassName="mb-8"
              type="text"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon="Mail"
              label="Mail"
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon="Password"
              label="Password"
            />

            {error && (
              <span className="text-action-red text-sm mt-4">{error}</span>
            )}

            <button
              className="flex justify-center items-center w-full max-w-[180px] h-14 bg-primary-100 rounded-xl outline-primary-10 mt-12 py-4 text-lg text-white hover:bg-primary-80"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
