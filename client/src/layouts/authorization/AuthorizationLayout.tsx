import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import backgroundImage from '../../assets/images/authorization-background.jpg';

const AuthorizationLayoutStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  padding: 0 2rem;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  &::after {
    content: ' ';
    width: 50%;
    height: 1px;
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.colors.main} 10%,
      transparent 90%
    );
    position: absolute;
    bottom: 1rem;
    left: 0;
  }
`;

const AuthorizationLayout = (): JSX.Element => (
  <AuthorizationLayoutStyled>
    <Outlet />
  </AuthorizationLayoutStyled>
);

export default AuthorizationLayout;
