import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

export const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})
