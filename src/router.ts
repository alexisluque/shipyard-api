import express, { Router } from 'express';

import { createAuthRouter } from './features/auth/auth.route.js';
import { createNotesRouter } from './features/notes/notes.route.js';
import { authMiddleware } from './middleware/auth.js';
import type { AppContext } from './app/context.js';

export const createRouter = (ctx: AppContext) => {
  const router: Router = express.Router();

  router.use('/auth', createAuthRouter(ctx));
  router.use('/notes', authMiddleware, createNotesRouter(ctx));

  return router;
};
