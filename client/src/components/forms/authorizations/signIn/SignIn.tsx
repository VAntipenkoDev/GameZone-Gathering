import React from 'react';
import { useFormik } from 'formik';

import Form from '../../../form/Form';
import Input from '../../../ui/Input/Input';
import { SignInSchema } from './validationSchema';

const SignIn = (): JSX.Element => {
  const formik = useFormik({
    initialValues: {
      login: '',
      password: '',
    },
    onSubmit: ({
      login,
      password,
    }: {
      login: string;
      password: string;
    }) => {
      console.log(login);
      console.log(password);
    },
    validationSchema: SignInSchema,
  });

  return (
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
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="off"
        touched={formik.touched.password}
        error={formik.errors?.password}
        onChange={formik.handleChange}
        setTouched={formik.setTouched}
      />
      <button type="submit">Login</button>
    </Form>
  );
};

export default SignIn;
