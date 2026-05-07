import express, { Router } from 'express';
import { validate } from '../../middleware/validation.js';
import { loginSchema } from './auth.schema.js';
import { createAuthController } from './auth.controller.js';
import type { AppContext } from '../../app/context.js';

export const createAuthRouter = (ctx: AppContext) => {
  const { login, register } = createAuthController(ctx);
  const router: Router = express.Router();

  router.post('/register', validate(loginSchema), register);
  router.post('/login', validate(loginSchema), login);

  return router;
};
