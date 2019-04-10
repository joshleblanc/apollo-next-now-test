import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import { gql } from 'apollo-boost';
import ApolloClient from "apollo-client";
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'


const HELLO_QUERY = gql`
  {
    hello
  }
`

const client = new ApolloClient({
    link: createHttpLink({
        uri: "/graphql",
        fetch: fetch
    }),
    cache: new InMemoryCache()
  });

export default () => (
    <ApolloProvider client={client}>
    <Query query={HELLO_QUERY}>
        {
          ({ data }) => (
            <div>{data.hello}</div>
          )
        }
      </Query>
    </ApolloProvider>
)