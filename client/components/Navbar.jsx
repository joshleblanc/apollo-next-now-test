import React from "react";
import {AppBar, Toolbar} from '@material-ui/core';
import LinkButton from './LinkButton';

export default () => (
  <AppBar position={"static"}>
    <Toolbar>
      <LinkButton href='/'>Home</LinkButton>
      <LinkButton href='/about'>About</LinkButton>
    </Toolbar>
  </AppBar>
)