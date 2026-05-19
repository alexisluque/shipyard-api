import express, { Router } from 'express';
import type { AppContext } from '../../app/context.js';

export const createHealthRouter = (ctx: AppContext) => {
  const router: Router = express.Router();

  router.get('/', (_req, res) => {
    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  router.get('/db', async (_req, res) => {
    await ctx.db.manager.query('SELECT 1');

    res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  });

  return router;
};
