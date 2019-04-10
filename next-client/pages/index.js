import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const HELLO_QUERY = gql`
  {
    hello
  }
`

export default () => (
  <Query query={HELLO_QUERY}>
    {
      ({ data }) => (
        <div>{data.hello}</div>
      )
    }
  </Query>
)