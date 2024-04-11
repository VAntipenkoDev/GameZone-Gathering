import React from 'react';

import AuthorizationBlock from '../../components/authorizationBlock/AuthorizationBlock';
import SignUp from '../../components/forms/authorizations/signUp/SignUp';

const SignUpPage = (): JSX.Element => (
  <AuthorizationBlock>
    <SignUp />
  </AuthorizationBlock>
);

export default SignUpPage;
