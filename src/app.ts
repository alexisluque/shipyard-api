import express from 'express';
import type { Express } from 'express';
import router from './router.js';
import { initDb, query } from './db/index.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';
import type { PoolConfig } from 'pg';

export const createApp = (poolConfig: PoolConfig) => {
  const app: Express = express();

  initDb(poolConfig);

  app.use(express.json());

  app.use('/api', router);

  app.get('/health', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  app.get('/health/db', async (_req, res) => {
    try {
      await query('SELECT 1', []);
      res.status(200).json({ status: 'ok' });
    } catch {
      res.status(500).json({ status: 'error' });
    }
  });

  app.use(errorHandlerMiddleware);

  return app;
};
