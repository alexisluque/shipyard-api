import express from 'express';
import type { Express } from 'express';
import { createRouter } from '../router.js';
import { createErrorHandlerMiddleware } from '../middleware/errorHandler.js';
import dataSource from '../db/data-source.cli.js';
import type { AppContext } from './context.js';
import { createHttpLogger } from '../lib/http-logger.js';

export const createApp = async (ctx: AppContext) => {
  const app: Express = express();

  app.use(createHttpLogger(ctx.logger));

  app.use(express.json());

  app.use('/api', createRouter(ctx));

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/health/db', async (_req, res) => {
    try {
      dataSource.manager.query('SELECT 1');

      res.status(200).json({ status: 'ok' });
    } catch {
      res.status(500).json({ status: 'error' });
    }
  });

  app.use(createErrorHandlerMiddleware(ctx));

  return app;
};
