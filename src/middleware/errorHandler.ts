import type { Request, Response, NextFunction } from 'express';
import { AppError, ValidationError } from '../error/error.js';
import type { AppContext } from '../app/context.js';

export const createErrorHandlerMiddleware = ({ logger }: AppContext) => {
  const errorHandlerMiddleware = (
    err: Error,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ) => {
    logger.error(err);
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

  return errorHandlerMiddleware;
};
