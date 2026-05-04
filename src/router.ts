import express, { Router } from 'express';

import { createAuthRouter } from './auth/auth.route.js';
import { createNotesRouter } from './notes/notes.route.js';
import { authMiddleware } from './middleware/auth.js';
import type { AppContext } from './app/context.js';

export const createRouter = (ctx: AppContext) => {
  const router: Router = express.Router();

  router.use('/auth', createAuthRouter(ctx));
  router.use('/notes', authMiddleware, createNotesRouter(ctx));

  return router;
};
