import React from "react";
import {Paper} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(1)
  }
}), {withTheme: true})

export default ({children}) => {
  const classes = useStyles();

  return (
    <Paper classes={classes}>{children}</Paper>
  )
}