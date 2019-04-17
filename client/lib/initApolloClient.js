import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import resolvers from './resolvers';
import ApolloClient from "apollo-client";
import { setContext } from 'apollo-link-context';

let client = null;

function create(cookie, initialState) {
    const cache = new InMemoryCache().restore(initialState || {});
    const authLink = setContext((_, { headers }) => {
        return {
            headers: {
                ...headers,
                authorization: cookie ? `Bearer ${cookie.token}` : ''
            }
        }
    })
    const link = createHttpLink({
        uri: "http://localhost:4000/graphql",
        fetch: fetch,
        credentials: 'same-origin'
    })
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: authLink.concat(link),
        cache,
        resolvers
    });
}

export default function initApolloClient(cookie, initialState) {
    if (!process.browser) {
        return create(cookie, initialState);
    }

    if (!client) {
        client = create(cookie, initialState);
    }
    return client;
}