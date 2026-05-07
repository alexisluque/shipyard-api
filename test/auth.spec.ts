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

  const logger = pino({ level: 'debug', transport: { target: 'pino-pretty' } });

  app = await createApp({ db, logger });

  request = supertest(app);
});

beforeEach(async () => {
  await resetDatabase(db);
});

describe('POST /auth/register', () => {
  it('should register a new user', async () => {
    const res = await request.post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'user@example.com',
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    expect(Date.parse(res.body.created_at)).not.toBeNaN();
    expect(Date.parse(res.body.updated_at)).not.toBeNaN();
  });

  it('should return 422 with invalid body', async () => {
    let res = await request.post('/api/auth/register').send({
      email: 'not-an-email',
      password: '123',
    });

    expect(res.status).toBe(422);
    expect(res.body.fields).toHaveLength(2);
    expect(res.body.fields[0]).toEqual({
      path: 'email',
      message: 'Invalid email',
    });
    expect(res.body.fields[1]).toEqual({
      path: 'password',
      message: 'Should be >= than 8',
    });

    res = await request.post('/api/auth/register').send({});

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'email',
        message: 'Required',
      },
      {
        path: 'password',
        message: 'Required',
      },
    ]);
  });

  it('should return 422 with invalid body', async () => {
    const res = await request.post('/api/auth/register').send({});

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'email',
        message: 'Required',
      },
      {
        path: 'password',
        message: 'Required',
      },
    ]);
  });

  it('should return 409 if email already exists', async () => {
    await request.post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'password123',
    });

    const res = await request.post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(409);
    expect(res.body).toEqual({
      name: 'ConflictError',
      message: 'Email already exists',
    });
  });
});

describe('POST /auth/login', () => {
  it('should login and return an access token', async () => {
    await request.post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'password123',
    });

    const res = await request.post('/api/auth/login').send({
      email: 'user@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ accessToken: expect.any(String) });
  });

  it('should return 401 with wrong password', async () => {
    await request.post('/api/auth/register').send({
      email: 'user@example.com',
      password: 'password123',
    });

    const res = await request.post('/api/auth/login').send({
      email: 'user@example.com',
      password: 'wrongpassword',
    });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      name: 'UnauthorizedError',
      message: 'Invalid credentials',
    });
  });

  it('should return 401 with non existing email', async () => {
    const res = await request.post('/api/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  it('should return 422 with invalid body', async () => {
    const res = await request.post('/api/auth/login').send({
      email: 'not-an-email',
      password: '123',
    });

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'email',
        message: 'Invalid email',
      },
      {
        path: 'password',
        message: 'Should be >= than 8',
      },
    ]);
  });
});

// afterAll(async () => {
//   // await end();
// });
