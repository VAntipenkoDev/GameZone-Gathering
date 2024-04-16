import { Request, Response, NextFunction } from 'express';

import TokensController from '../controllers/tokens-controller';
import ApiError from '../exeptions/api-error';

export interface IRequest extends Request {
  user: any;
}

export function authorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return next(ApiError.UnautorizedError());
    }

    const acessToken = authorizationHeader.split(' ')[1];

    if (!acessToken) {
      return next(ApiError.UnautorizedError());
    }

    const jwtAccessSecretKey =
      process.env.JWT_ACCESS_SECRET ||
      'jwt_refresh_secret_';

    const userData = TokensController.validateToken(
      acessToken,
      jwtAccessSecretKey,
    );

    if (!userData) {
      return next(ApiError.UnautorizedError());
    }
    //@ts-ignore
    req.user = userData;

    next();
  } catch (error) {
    return next(ApiError.UnautorizedError());
  }
}
