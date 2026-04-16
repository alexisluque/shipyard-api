import type { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../error/error.js';

export const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
) => {
  console.error(err);
  console.error(err.cause);

  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({
      message: err.message,
      fields: err.fields,
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      name: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    name: 'internalServerError',
    message: 'Internal server error',
  });
};
