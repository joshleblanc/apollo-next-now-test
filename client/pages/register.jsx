import React from 'react';
import AccountForm from "../components/AccountForm";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import gql from "graphql-tag";
import { useMutation } from 'react-apollo-hooks';
import { Typography } from '@material-ui/core';
import Link from '../components/Link';

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required().min(8),
  confirmPassword: Yup.string().test('confirm-password', "Passwords do not match", function (v) {
    const { password } = this.parent;
    return password === v;
  })
});

const REGISTER = gql`
    mutation register($email: String!, $password: String!, $confirmPassword: String!) {
        register(email: $email, password: $password, confirmPassword: $confirmPassword)
    }
`;

const TOGGLE_EMAIL_VERIFICATION_MODAL = gql`
    mutation toggleEmailVerification {
      toggleEmailVerification @client
    }
`;

export default () => {
  const { enqueueSnackbar } = useSnackbar();
  const register = useMutation(REGISTER);
  const toggleEmailVerification = useMutation(TOGGLE_EMAIL_VERIFICATION_MODAL);

  const handleSubmit = React.useCallback(async (values, props) => {
    try {
      await register({
        variables: {
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword
        }
      });
      toggleEmailVerification();
      enqueueSnackbar("Registered!", { variant: "success" })
    } catch (err) {
      enqueueSnackbar("User already exists!", { variant: "error" })
    }
    props.setSubmitting(false);
  });

  return (
    <React.Fragment>
      <AccountForm
        title={"Register"}
        onSubmit={handleSubmit}
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={schema}
        fields={[
          { name: "email", label: "Email" },
          { name: "password", label: "Password", type: "password" },
          { name: "confirmPassword", label: "Confirm Password", type: "password" },
        ]}
      >
        <Typography variant={"subtitle1"}>
          Already have an account? <Link href={"/login"}>Click here</Link> to log in
        </Typography>
      </AccountForm>
    </React.Fragment>
  )
}