import express from 'express';
import { query } from './db/index.js';
import { env } from '../config/env.js';

const app = express();

app.use(express.json());

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

app.listen(env.PORT, () => {
  console.log('App listening on port', env.PORT);
});
