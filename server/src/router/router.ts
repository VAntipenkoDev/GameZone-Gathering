import { Router } from 'express';

import AuthorizationController from '../controllers/authorization-controller';
import UserController from '../controllers/user-controller';
import { authorizationMiddleware } from '../middleware/authorization-middleware';
import {
  signInValidator,
  signUpValidator,
} from './route-validator';

const router = Router();

router.post(
  '/signIn',
  signInValidator,
  AuthorizationController.signIn,
);

router.post(
  '/signUp',
  signUpValidator,
  AuthorizationController.signUp,
);

router.post(
  '/refreshToken',
  AuthorizationController.refreshToken,
);

router.get(
  '/users',
  authorizationMiddleware,
  UserController.getUsers,
);

export default router;
