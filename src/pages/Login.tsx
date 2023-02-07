import { ApolloError } from '@apollo/client'
import { useState } from 'react'

import Icon from '../components/ui/Icon'
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
            <div className="relative flex items-center w-full h-[52px] bg-[#eff1f999] rounded-lg mb-8">
              <Icon
                name="Mail"
                width={22}
                height={20}
                className="absolute left-[18px]"
              />

              <input
                className="w-full h-full bg-transparent outline-primary-10 text-base text-[#ABAFB1] pr-[18px] pl-14"
                type="text"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative flex items-center w-full h-[52px] bg-[#eff1f999] rounded-lg">
              <Icon
                name="Password"
                width={18}
                height={20}
                className="absolute left-[18px]"
              />

              <input
                className="w-full h-full bg-transparent outline-primary-10 text-base text-[#ABAFB1] pr-[18px] pl-14"
                type="text"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <span className="text-action-red text-sm mt-4">{error}</span>
            )}

            <button
              className="flex justify-center items-center w-full max-w-[180px] bg-primary-100 rounded-xl outline-primary-10 mt-12 py-4 text-xl text-white hover:bg-primary-80"
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

export { Login }
