import React from 'react';
import App, {Container} from 'next/app';
import {ApolloProvider} from 'react-apollo';
import ApolloClient from "apollo-client";
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import fetch from 'node-fetch'
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import {SnackbarProvider} from "notistack";
import {CssBaseline} from "@material-ui/core";
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from "../lib/getPageContext";


const client = new ApolloClient({
    link: createHttpLink({
        uri: "/graphql",
        fetch: fetch
    }),
    cache: new InMemoryCache()
});


export default class extends App {
    constructor() {
        super();
        this.pageContext = getPageContext();
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    static async getInitialProps({Component, ctx}) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx)
        }

        return {pageProps}
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>

                <JssProvider
                    registry={this.pageContext.sheetsRegistry}
                    generateClassName={this.pageContext.generateClassName}
                >
                    <SnackbarProvider>
                        <MuiThemeProvider
                            theme={this.pageContext.theme}
                            sheetsManager={this.pageContext.sheetsManager}
                        >
                            <ApolloProvider client={client}>
                                <CssBaseline/>
                                <Component pageContext={this.pageContext} {...pageProps} />
                            </ApolloProvider>
                        </MuiThemeProvider>
                    </SnackbarProvider>
                </JssProvider>
            </Container>


        )
    }
}