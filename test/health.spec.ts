import { expect, describe, it, beforeAll, beforeEach } from 'vitest';
import supertest from 'supertest';
import { createApp } from '../src/app/app.js';
import type TestAgent from 'supertest/lib/agent.js';
import type { DataSource } from 'typeorm';
import { resetDatabase } from './setup-db.js';
import { createTestDataSource } from './data-source.tests.js';
import pino from 'pino';

let app;
let db: DataSource;
let request: TestAgent;

beforeAll(async () => {
  db = createTestDataSource({ url: process.env.DATABASE_URL! });
  await db.initialize();

  const logger = pino({ level: 'silent' });

  app = await createApp({ db, logger });

  request = supertest(app);
});

beforeEach(async () => {
  await resetDatabase(db);
});

describe('GET /health', async () => {
  it('should return 200', async () => {
    const res = await request.get('/api/health').send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      uptime: expect.any(Number),
      timestamp: expect.any(String),
    });

    expect(Date.parse(res.body.timestamp)).not.toBeNaN();
  });
});

describe('GET /health/db', async () => {
  it('should return 200', async () => {
    const res = await request.get('/api/health/db').send();

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      status: 'ok',
      uptime: expect.any(Number),
      timestamp: expect.any(String),
    });

    expect(Date.parse(res.body.timestamp)).not.toBeNaN();
  });

  it('should return 500 when db is not running', async () => {
    await db.destroy();
    const res = await request.get('/api/health/db').send();

    expect(res.status).toBe(500);
  });
});
