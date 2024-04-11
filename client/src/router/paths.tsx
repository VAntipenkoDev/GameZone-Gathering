import React from 'react';

import AuthorizationLayout from '../layouts/authorization/AuthorizationLayout';
import SignInPage from '../pages/signInPage/SignInPage';
import SignUpPage from '../pages/signUpPage/SignUpPage';

export const paths = [
  {
    path: '/',
    element: <AuthorizationLayout />,
    children: [
      {
        path: '/',
        element: <SignInPage />,
      },
      {
        path: '/signUp',
        element: <SignUpPage />,
      },
    ],
  },
];
