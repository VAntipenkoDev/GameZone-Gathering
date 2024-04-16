import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import AuthorizationService from '../services/authorization-service';
import ApiError from '../exeptions/api-error';

class AuthorizationController {
  async signIn(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(
          ApiError.BadRequest(
            'Invalid validation',
            errors.array(),
          ),
        );
      }

      const { email, password } = req.body;

      const userData = await AuthorizationService.signIn({
        email,
        password,
      });

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async signUp(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        next(
          ApiError.BadRequest(
            'Invalid validation',
            errors.array(),
          ),
        );
      }

      const { login, email, password, confirmPassword } =
        req.body;

      const userData = await AuthorizationService.signUp({
        login,
        email,
        password,
        confirmPassword,
      });

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { refreshToken } = req.cookies;
      const userData =
        await AuthorizationService.refreshToken(
          refreshToken,
        );

      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthorizationController();
