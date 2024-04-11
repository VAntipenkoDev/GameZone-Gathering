import React from 'react';
import styled, { keyframes } from 'styled-components';

interface IInputWrapper {
  error?: string;
  touched?: boolean;
  type?: 'text' | 'number' | 'password';
}

interface IInput {
  type?: 'text' | 'number' | 'password';
  name: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  id: string;
  label?: string;
  touched?: boolean;
  autoComplete?: 'off' | 'on';
  value?: string | number;
  error?: string;
  setTouched?: any;
}

interface IErrorMassage {
  delay: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const InputWrapper = styled.div<IInputWrapper>`
  border-radius: 0.2rem;
  border: 1px solid
    ${({ theme, error, touched }) =>
      error?.length && touched
        ? theme.colors.red
        : theme.colors.main};
  background: ${({ theme }) => theme.colors.black};
  box-shadow: ${({ theme, error, touched }) =>
    error && touched
      ? `0 4px 5px -3.5px ${theme.colors.red}`
      : null};
`;

const InputStyle = styled.input`
  border: none;
  background: none;
  width: 100%;
  outline: none;
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) =>
    theme.sizes.input.defaultInputPadding};
`;

const LabelStyle = styled.label`
  color: ${({ theme }) => theme.colors.white};
  display: block;
  margin-bottom: 0.5rem;
`;

const ErrorMassageStyle = styled.div<IErrorMassage>`
  display: inline;
  font-size: 0.7rem;
  opacity: 0;
  animation: ${fadeIn} 0.1ms forwards;
  animation-delay: ${({ delay }) => delay};
  color: ${({ theme }) => theme.colors.red};
  font-weight: bold;
`;

const ANIMATION_TIME = 25;

const Input = ({
  type = 'text',
  onChange,
  value,
  id,
  name,
  label,
  autoComplete = 'on',
  error,
  setTouched,
  touched,
}: IInput): JSX.Element => (
  <div>
    <LabelStyle>{label}</LabelStyle>
    <InputWrapper
      error={error}
      type={type}
      touched={touched}
    >
      <InputStyle
        id={id}
        onChange={e => {
          if (onChange) {
            if (setTouched) {
              setTouched({ [`${name}`]: true });
            }
            onChange(e);
          }
        }}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={value}
      />
    </InputWrapper>
    {error && touched && (
      <>
        {error
          .split('')
          .map((char: string, index: number) => (
            <ErrorMassageStyle
              delay={`${index * ANIMATION_TIME}ms`}
              key={`${index}_${char}`}
            >
              {char}
            </ErrorMassageStyle>
          ))}
      </>
    )}
  </div>
);

export default Input;
