import express from 'express';
import type { Express } from 'express';
import { createRouter } from '../router.js';
import { createErrorHandlerMiddleware } from '../middleware/errorHandler.js';
import type { AppContext } from './context.js';
import { createHttpLogger } from '../lib/http-logger.js';

export const createApp = async (ctx: AppContext) => {
  const app: Express = express();

  app.use(createHttpLogger(ctx.logger));

  app.use(express.json());

  app.use('/api', createRouter(ctx));

  app.use(createErrorHandlerMiddleware(ctx));

  return app;
};
