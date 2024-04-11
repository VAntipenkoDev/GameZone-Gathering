import React from 'react';

import AuthorizationBlock from '../../components/authorizationBlock/AuthorizationBlock';
import SignIn from '../../components/forms/authorizations/signIn/SignIn';

const SignInPage = (): JSX.Element => (
  <AuthorizationBlock>
    <SignIn />
  </AuthorizationBlock>
);

export default SignInPage;
