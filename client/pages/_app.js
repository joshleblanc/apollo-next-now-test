import React from 'react';
import App, { Container } from 'next/app';
import { SnackbarProvider } from "notistack";
import { CssBaseline } from "@material-ui/core";
import ProviderOfTheme from '../providers/ProviderOfTheme';
import ProviderOfApollo from '../providers/ProviderOfApollo';
import Navbar from '../components/Navbar';


export default class extends App {

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ProviderOfTheme>
          <SnackbarProvider>
            <ProviderOfApollo>
              <CssBaseline />
              <Navbar />
              <Component {...pageProps} />
            </ProviderOfApollo>
          </SnackbarProvider>
        </ProviderOfTheme>
      </Container>
    )
  }
}