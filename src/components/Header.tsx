import { useAuth } from '../contexts/auth'

const Header = () => {
  const { user, handleLogout } = useAuth()

  return (
    <header>
      <span>{user.email}</span>

      <span>{user.name}</span>

      <button onClick={handleLogout}>Logout</button>
    </header>
  )
}

export { Header }
