import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import resolvers from '../lib/resolvers';
import ApolloClient from "apollo-client";
import { setContext } from 'apollo-link-context';
import { onError } from "apollo-link-error";
import Cookies from 'js-cookie';
import Router from 'next/router';
import gql from 'graphql-tag';

const GET_TOKEN = gql`
    {
        token @client
    }
`;

let client = null;
function create(initialState, host) {
    const cache = new InMemoryCache().restore(initialState || {});
    const authLink = setContext((_, {headers}) => {
        const { token } = cache.readQuery({ query: GET_TOKEN });
        console.log(token);
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
    })
    const errorLink = onError(({ graphQLErrors }) => {
        console.log("Something went wrong with the query: ", graphQLErrors);
        if(graphQLErrors && graphQLErrors.some(e => e.message === "Not authorized")) {
            console.log("Permission denied");
            cache.writeData({
                data: {
                    token: null
                }
            });
            Cookies.remove('token');
            Router.push('/');
        }
    })

    const link = createHttpLink({
        uri: host,
        fetch: fetch,
        credentials: 'same-origin'
    })
    return new ApolloClient({
        connectToDevTools: process.browser,
        ssrMode: !process.browser,
        link: authLink.concat(errorLink).concat(link),
        cache,
        resolvers
    });
}

export default function initApolloClient(initialState, host) {
    if (!process.browser) {
        return create(initialState, host);
    }

    if (!client) {
        client = create(initialState, host);
    }
    return client;
}
