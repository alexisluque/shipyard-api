import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../error/error.js';

const { JWT_SECRET } = process.env;

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new UnauthorizedError('Missing token'));
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    next(new UnauthorizedError('Missing token'));
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET!) as {
      userId: string;
    };

    req.userId = payload.userId;

    next();
  } catch (error) {
    next(new UnauthorizedError('Invalid token', { cause: error }));
  }
};
