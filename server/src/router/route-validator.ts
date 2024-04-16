import { checkSchema } from 'express-validator';

export const signInValidator = checkSchema(
  {
    email: {
      notEmpty: true,
      isLength: {
        options: {
          min: 3,
          max: 16,
        },
      },
    },
    password: {
      notEmpty: true,
      isLength: {
        options: {
          min: 6,
          max: 16,
        },
      },
    },
  },
  ['body'],
);

export const signUpValidator = checkSchema(
  {
    login: {
      notEmpty: true,
      isLength: {
        options: {
          min: 3,
          max: 16,
        },
      },
    },
    email: {
      notEmpty: true,
      isEmail: true,
    },
    password: {
      notEmpty: true,
      isLength: {
        options: {
          min: 6,
          max: 16,
        },
      },
    },
    confirmPassword: {
      notEmpty: true,
      isLength: {
        options: {
          min: 6,
          max: 16,
        },
      },
    },
  },
  ['body'],
);
