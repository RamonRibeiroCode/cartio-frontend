import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'

import Routes from './routes'
import { AuthProvider } from './contexts/auth'
import { client } from './lib/apollo'

import './App.css'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
