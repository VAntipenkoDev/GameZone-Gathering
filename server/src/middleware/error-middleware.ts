import { Request, Response, NextFunction } from 'express';

import ApiError from '../exeptions/api-error';

export function errorMiddleware(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('errorMiddleware: ', error);

  if (error instanceof ApiError) {
    return res.status(error.status).json({
      massage: error.message,
      errors: error.errors,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}
