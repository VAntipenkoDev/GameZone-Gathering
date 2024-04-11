import * as Yup from 'yup';
import {
  MIN_LOGIN_LENGTH,
  MAX_LOGIN_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from '../../../../constants';

export const SignUpSchema = Yup.object().shape({
  login: Yup.string()
    .required('This field is required.')
    .min(
      MIN_LOGIN_LENGTH,
      `Login must be at least ${MIN_LOGIN_LENGTH} characters long.`,
    )
    .max(
      MAX_LOGIN_LENGTH,
      `Login cannot exceed ${MAX_LOGIN_LENGTH} characters.`,
    ),
  email: Yup.string()
    .required('This field is required.')
    .email('Invalid email.'),
  password: Yup.string()
    .required('This field is required.')
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    )
    .max(
      MAX_PASSWORD_LENGTH,
      `Password cannot exceed ${MAX_PASSWORD_LENGTH} characters.`,
    ),
  confirmPassword: Yup.string()
    .required('This field is required.')
    .oneOf([Yup.ref('password')], 'Password don`t match!')
    .min(
      MIN_PASSWORD_LENGTH,
      `Password must be at least ${MIN_PASSWORD_LENGTH} characters long.`,
    )
    .max(
      MAX_PASSWORD_LENGTH,
      `Password cannot exceed ${MAX_PASSWORD_LENGTH} characters.`,
    ),
});
