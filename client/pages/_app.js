import React from 'react';
import App, { Container } from 'next/app';
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import ProviderOfTheme from '../providers/ProviderOfTheme';
import Navbar from '../components/Navbar';
import cookies from "next-cookies";
import Head from 'next/head'
import initApollo from '../lib/initApolloClient';
import { ApolloProvider, getMarkupFromTree  } from 'react-apollo-hooks';
import { renderToString } from 'react-dom/server';

export default class extends App {

  constructor(props) {
    super(props);
    console.log(props);
    this.apolloClient = initApollo(props.cookie, props.apolloState);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, ...pageProps }) {
    const cookie = cookies(pageProps.ctx);
    const { token, id } = cookie;
    const apollo = initApollo(cookie)
    apollo.cache.writeData({
      data: {
        isLoggedIn: !!(token && id)
      }
    })

    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    if (!process.browser) {
      try {
        // Run all GraphQL queries
        await getMarkupFromTree ({
          renderFunction: renderToString,
          tree: <Container>
            <ProviderOfTheme>
              <SnackbarProvider>
                <ApolloProvider client={apollo}>
                  <CssBaseline />
                  <Navbar />
                  <Component {...pageProps} />
                </ApolloProvider>
              </SnackbarProvider>
            </ProviderOfTheme>
          </Container>
        })
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
        console.error('Error while running `getDataFromTree`', error)
      }

      // getDataFromTree does not call componentWillUnmount
      // head side effect therefore need to be cleared manually
      Head.rewind()
    }
    const apolloState = apollo.cache.extract()

    return {
      cookie: cookie,
      apolloState: apolloState
    }
  }

  render() {
    const { Component, ...pageProps } = this.props;
    return (
      <Container>
        <ProviderOfTheme>
          <SnackbarProvider>
            <ApolloProvider client={this.apolloClient}>
              <CssBaseline />
              <Navbar />
              <Component {...pageProps} />
            </ApolloProvider>
          </SnackbarProvider>
        </ProviderOfTheme>
      </Container>
    )
  }
}