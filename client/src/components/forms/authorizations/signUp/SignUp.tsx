import React from 'react';
import { useFormik } from 'formik';

import Form from '../../../form/Form';
import Input from '../../../ui/Input/Input';
import { SignUpSchema } from './validationSchema';
import AuthorizationBlock from '../../../authorizationBlock/AuthorizationBlock';

const SignUp = (): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
      confirmPassword: '',
      email: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: ({
      login,
      email,
      password,
      confirmPassword,
    }: {
      login: string;
      email: string;
      password: string;
      confirmPassword: string;
    }) => {},
  });

  return (
    <AuthorizationBlock>
      <Form onSubmit={formik.handleSubmit}>
        <Input
          id="login"
          name="login"
          label="Login"
          autoComplete="off"
          touched={formik.touched.login}
          error={formik.errors?.login}
          onChange={formik.handleChange}
          setTouched={formik.setTouched}
        />
        <Input
          id="email"
          name="email"
          label="Email"
          autoComplete="off"
          touched={formik.touched.email}
          error={formik.errors?.email}
          onChange={formik.handleChange}
          setTouched={formik.setTouched}
        />
        <Input
          id="password"
          name="password"
          label="Password"
          autoComplete="off"
          touched={formik.touched.password}
          error={formik.errors?.password}
          onChange={formik.handleChange}
          setTouched={formik.setTouched}
          type="password"
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm password"
          autoComplete="off"
          touched={formik.touched.confirmPassword}
          error={formik.errors?.confirmPassword}
          onChange={formik.handleChange}
          setTouched={formik.setTouched}
          type="password"
        />
        <button type="submit">Register</button>
      </Form>
    </AuthorizationBlock>
  );
};

export default SignUp;
