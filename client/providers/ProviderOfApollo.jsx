import {ApolloProvider} from 'react-apollo-hooks';
import ApolloClient from "apollo-client";
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

const client = new ApolloClient({
  link: createHttpLink({
    uri: "/graphql",
    fetch: fetch
  }),
  cache: new InMemoryCache()
});


export default ({children}) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
)