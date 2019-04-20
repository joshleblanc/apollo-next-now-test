import React from "react";
import {AppBar, Toolbar, Button} from '@material-ui/core';
import LinkButton from './LinkButton';
import gql from 'graphql-tag';
import { useQuery, useMutation } from "react-apollo-hooks";

const GET_TOKEN = gql`
  {
    token @client
  }
`;

const LOGOUT = gql`
  mutation Logout {
    logout @client
  }
`;

export default () => {
  const { data } = useQuery(GET_TOKEN);
  const logout = useMutation(LOGOUT);
  return(
    <AppBar position={"static"}>
    <Toolbar>
      <LinkButton href='/'>Home</LinkButton>
      {
        data.token 
          ? <Button onClick={logout}>Logout</Button>
          : <LinkButton href='/login'>Login</LinkButton>
      }
    </Toolbar>
  </AppBar>
  )
  
}