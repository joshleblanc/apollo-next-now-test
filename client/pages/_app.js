import React from 'react';
import App, { Container } from 'next/app';
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import Navbar from '../components/Navbar';
import nextCookie from "next-cookies";
import Head from 'next/head'
import initApollo from '../lib/initApolloClient';
import { ApolloProvider, getMarkupFromTree } from 'react-apollo-hooks';
import { renderToString } from 'react-dom/server';
import theme from '../lib/theme';
import { ThemeProvider } from "@material-ui/styles";

export default class extends App {

  constructor(props) {
    super(props);
    this.apolloClient = initApollo(props.apolloState, props.host);
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  static async getInitialProps({ Component, ...pageProps }) {
    let host;
    if(process.env.NODE_ENV === 'development') {
      host = "http://localhost:4000/graphql";
    } else {
      if(process.browser) {
        host = `https://${window.location.hostname}/graphql`;
      } else {
        host = `https://${pageProps.ctx.req.headers.host}/graphql`;
      }
    }
    // console.log(global);
    // console.log(host)
    const { token } = nextCookie(pageProps.ctx);

    const apollo = initApollo(null, host);
    apollo.cache.writeData({
      data: {
        token: token || null,
      }
    })
    
    // Run all GraphQL queries in the component tree
    // and extract the resulting data
    if (!process.browser) {
      try {
        // Run all GraphQL queries
        await getMarkupFromTree({
          renderFunction: renderToString,
          tree: <Container>
            <ThemeProvider theme={theme}>
              <SnackbarProvider>
                <ApolloProvider client={apollo}>
                  <CssBaseline />
                  <Navbar />
                  <Component {...pageProps} />
                </ApolloProvider>
              </SnackbarProvider>
            </ThemeProvider>
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
      apolloState: apolloState,
      host
    }
  }

  render() {
    const { Component, ...pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <ApolloProvider client={this.apolloClient}>
              <CssBaseline />
              <Navbar />
              <Component {...pageProps} />
            </ApolloProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </Container>
    )
  }
}
