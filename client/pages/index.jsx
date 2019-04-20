import React from 'react';
import gql from 'graphql-tag';
import { useSnackbar } from 'notistack';
import StyledPaper from '../components/StyledPaper';
import { useQuery } from 'react-apollo-hooks';
import { LinearProgress, Button } from '@material-ui/core';

const HELLO_QUERY = gql`
  {
    hello
  }
`

export default () => {
  const { data, error, loading } = useQuery(HELLO_QUERY);
  const { enqueueSnackbar } = useSnackbar();
  const handleClick = React.useCallback(() => {
    enqueueSnackbar("A notification!", { variant: "success" })
  });

  if(loading) {
    return <LinearProgress />;
  }
  if(error) {
    return "This shouldn't actually happen";
  }

  return(
    <React.Fragment>
      <StyledPaper>
        {data.hello}
        <Button onClick={handleClick}>Click me for a notification!</Button>
      </StyledPaper>
    </React.Fragment>
  )
}