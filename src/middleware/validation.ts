import type { NextFunction, Request, Response } from 'express';
import { ZodType } from 'zod';
import { ValidationError } from '../error/error.js';

type ValidateTarget = 'body' | 'params' | 'query';

export function validate(schema: ZodType, target: ValidateTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const fields = result.error.issues.map((issue) => ({
        path: issue.path.join('.'),
        message: issue.message,
      }));

      throw new ValidationError('Validation error', fields);
    }

    req[target] = result.data;
    next();
  };
}
