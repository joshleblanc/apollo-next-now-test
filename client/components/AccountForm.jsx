import React from "react";
import { Field, Formik, Form } from "formik";
import { TextField } from "formik-material-ui";
import makeStyles from "@material-ui/styles/makeStyles";
import { Button, Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  field: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  buttonContainer: {
    display: 'flex',
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1) * 2
  },
  button: {
    marginTop: theme.spacing(1),
  },
  grow: {
    flexGrow: 1
  },
  gridContainer: {
    height: "calc(100vh - 298px)",
  }
}), { withTheme: true });

export default ({ children, title, onSubmit, initialValues, fields, validationSchema }) => {
  const classes = useStyles();
  return (
    <Grid container spacing={8} alignItems={"center"} alignContent={"center"} className={classes.gridContainer}>
      <Grid item xs={1} sm={2} md={3} lg={5} xl={5} />
      <Grid item xs={12} sm={8} md={6} lg={3} xl={2}>
        <Paper className={classes.paper}>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              {
                fields.map(f => (
                  <Field
                    key={f.name}
                    {...f}
                    fullWidth
                    variant={"outlined"}
                    className={classes.field}
                    component={TextField}
                  />
                ))
              }
              <Button
                fullWidth
                variant={"outlined"}
                size={"large"}
                type={"submit"}
                className={classes.button}
                color={"primary"}
              >
                {title}
              </Button>
            </Form>
          </Formik>
          <div className={classes.divider} />
          {children}
        </Paper>
      </Grid>
    </Grid>
  )
}