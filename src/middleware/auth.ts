import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    next(new Error('Missing token'));
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    next(new Error('Missing token'));
    return;
  }

  try {
    const payload = jwt.verify(token, env.auth.JWT_SECRET) as {
      userId: string;
    };

    req.userId = payload.userId;

    next();
  } catch (error) {
    console.error(error);

    next(new Error('Invalid token'));
  }
};
