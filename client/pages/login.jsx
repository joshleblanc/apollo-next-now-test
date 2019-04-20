import React from "react";
import AccountForm from "../components/AccountForm";
import { Typography } from "@material-ui/core";
import * as Yup from "yup";
import gql from "graphql-tag";
import { useMutation } from 'react-apollo-hooks';
import { useSnackbar } from 'notistack';
import Link from '../components/Link';
import Cookies from 'js-cookie';

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

const SET_TOKEN = gql`
  mutation SetToken($token: String!) {
    setToken(token: $token) @client
  }
`;

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8)
});

export default () => {
  const login = useMutation(LOGIN_USER);
  const setToken = useMutation(SET_TOKEN);
  const { enqueueSnackbar } = useSnackbar();
  const handleSubmit = async (values, props) => {
    try {
      const { data } = await login({
        variables: {
          email: values.email,
          password: values.password
        }
      });
      await setToken({ variables: { token: data.login }});
      Cookies.set('token', data.login);
      enqueueSnackbar("Logged in!", { variant: "success" });
    } catch (err) {
      enqueueSnackbar("Username or password is incorrect", { variant: "error" })
    }
    props.setSubmitting(false);
  };

  return (
    <AccountForm
      title={"Login"}
      onSubmit={handleSubmit}
      initialValues={{ email: '', password: '' }}
      validationSchema={schema}
      fields={[
        { name: "email", label: "Email" },
        { name: "password", label: "Password", type: "password" }
      ]}
    >
      <Typography variant={"subtitle1"} align={"center"}>
        Don't have an account? <Link href="/register">Click here</Link> to register
      </Typography>
    </AccountForm>
  )
}