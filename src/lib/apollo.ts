import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from 'apollo-upload-client'

const getAuthLink = (token: string | null) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  return authLink
}

export const setAuthApolloClient = (token: string) => {
  const authLink = getAuthLink(token)

  client.setLink(authLink.concat(httpLink))
}

export const httpLink = createUploadLink({
  uri: import.meta.env.VITE_APOLLO_SERVER_URL,
})

const storagedToken = localStorage.getItem('cartio:token')

const authLink = getAuthLink(storagedToken)

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
