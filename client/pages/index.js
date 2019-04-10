import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withStyles, Paper } from '@material-ui/core';

const HELLO_QUERY = gql`
  {
    hello
  }
`

const styles = theme => ({
  root: {
    padding: theme.spacing.unit,
    margin: theme.spacing.unit
  }
})

export default withStyles(styles, { withTheme: true })(({classes}) => (
  <Query query={HELLO_QUERY}>
    {
      ({ data }) => (
        <Paper classes={classes}>{data.hello}</Paper>
      )
    }
  </Query>
));