import React from 'react';
import { styled } from 'styled-components';

const AuthorizationBlockStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 25rem;
  width: 100%;

  span {
    color: white;
    letter-spacing: 1px;
    font-size: 1.2rem;
    text-transform: uppercase;
  }
`;

interface IProps {
  children: JSX.Element | JSX.Element[];
}

const AuthorizationBlock = ({
  children,
}: IProps): JSX.Element => (
  <AuthorizationBlockStyled>
    {children}
  </AuthorizationBlockStyled>
);

export default AuthorizationBlock;
