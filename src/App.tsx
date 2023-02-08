import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import Routes from './routes'
import { client } from './lib/apollo'
import { SideBarProvider } from './contexts/sidebar'
import { AuthProvider } from './contexts/auth'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <SideBarProvider>
          <AuthProvider>
            <Routes />
          </AuthProvider>
        </SideBarProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
