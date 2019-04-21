# Setup #

## Server ##
`cd server && yarn install && npm start`

## Client ##
`cd client && yarn install && npm run dev`

# Deploy #
Setup your `now` secrets. The defaults are `@apollo-test-mongo-url` and `@jwt-secret`, these can be changed in `now.json`.

From the root direction: `now`

# What this includes #
This package exists entirely to accomodate next.js's out-of-box server-side rendering with Material-ui, Apollo, and authentication.

In addition, the repository is setup in such a way that you can deploy both the server and the client as a single now.sh deploy, with a single command. 

The authentication example is using mongo, but that can be replaced with anything. The main idea of the authentication example is to showcase how you can
use cookies to authenticate during the server-side pre-render, and the moving that cookie into local state to continue on the client side.

To accomplish this, we read the cookies on the initial render in `client/pages/_app.js`, and write it to apollo's local cache.

`nextCookie` is a nice little helper that grabs the cookie out of the context on the server, or grabs it out of document on the client

```js
static async getInitialProps({ Component, ...pageProps }) {
    // ...snip

    const { token } = nextCookie(pageProps.ctx);
    const apollo = initApollo(null, host);
    apollo.cache.writeData({
      data: {
        token: token || null,
      }
    })
```

In subsequent requests, we use an apollo-link-context to use an authorization header using the token in apollo's cache. 
Every time apollo hits the graphql endpoint, it will include the headers from the context link.

```js
const GET_TOKEN = gql`
    {
        token @client
    }
`;

const authLink = setContext((_, {headers}) => {
    const { token } = cache.readQuery({ query: GET_TOKEN });
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});
```
