import { expect, describe, it, beforeEach } from 'vitest';
import { createApp } from '../src/app.js';
import supertest from 'supertest';
import { query } from '../src/db/index.js';
import type { NoteDto } from '../src/notes/notes.dto.js';
import type { UserDto } from '../src/auth/auth.dto.js';

const app = createApp({
  connectionString: process.env.DATABASE_URL,
});

const request = supertest(app);

beforeEach(async () => {
  await query('DELETE FROM notes', []);
  await query('DELETE FROM users', []);
});

// helpers
async function loginAndRegister() {
  const { body } = await request.post('/api/auth/register').send({
    email: 'user@example.com',
    password: 'password123',
  });

  const user = body as UserDto;

  const res = await request.post('/api/auth/login').send({
    email: 'user@example.com',
    password: 'password123',
  });

  const accessToken = res.body.accessToken as string;

  return { user, accessToken };
}

async function createNote(token: string) {
  const res = await request
    .post('/api/notes')
    .set('Authorization', `Bearer ${token}`)
    .send({ title: 'Test note', content: 'Test content' });

  return res.body as NoteDto;
}

describe('GET /notes', () => {
  it('should return all notes for the authenticated user', async () => {
    const { accessToken, user } = await loginAndRegister();
    const note = await createNote(accessToken);

    const res = await request
      .get('/api/notes')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);

    expect(res.body[0]).toMatchObject({
      id: expect.any(String),
      user_id: user.id,
      title: note.title,
      content: note.content,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    expect(Date.parse(res.body[0].created_at)).not.toBeNaN();
    expect(Date.parse(res.body[0].updated_at)).not.toBeNaN();
  });

  it('should return 401 without token', async () => {
    const res = await request.get('/api/notes');

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      name: 'UnauthorizedError',
      message: 'Missing token',
    });
  });
});

describe('POST /notes', () => {
  it('should create a note', async () => {
    const { accessToken, user } = await loginAndRegister();

    const res = await request
      .post('/api/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Test note', content: 'Test content' });

    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(String),
      title: 'Test note',
      content: 'Test content',
      user_id: user.id,
      created_at: expect.any(String),
      updated_at: expect.any(String),
    });

    expect(Date.parse(res.body.created_at)).not.toBeNaN();
    expect(Date.parse(res.body.updated_at)).not.toBeNaN();
  });

  it('should return 422 with invalid body', async () => {
    const { accessToken } = await loginAndRegister();

    let res = await request
      .post('/api/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'title',
        message: 'Required',
      },
      {
        path: 'content',
        message: 'Required',
      },
    ]);

    res = await request
      .post('/api/notes')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: '', content: '' });

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'title',
        message: 'Should be >= than 1',
      },
      {
        path: 'content',
        message: 'Should be >= than 1',
      },
    ]);
  });

  it('should return 401 without token', async () => {
    const res = await request
      .post('/api/notes')
      .send({ title: 'Test note', content: 'Test content' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      name: 'UnauthorizedError',
      message: 'Missing token',
    });
  });
});

describe('PUT /notes/:id', () => {
  it('should update a note', async () => {
    const { accessToken } = await loginAndRegister();
    const note = await createNote(accessToken);

    const res = await request
      .put(`/api/notes/${note.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Updated title', content: 'Updated content' });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      id: note.id,
      title: 'Updated title',
      content: 'Updated content',
      created_at: note.created_at,
    });
    expect(new Date(res.body.updated_at).getTime()).toBeGreaterThan(
      new Date(note.updated_at).getTime(),
    );
  });

  it('should return 404 for non existing note', async () => {
    const { accessToken } = await loginAndRegister();

    const res = await request
      .put('/api/notes/999')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: 'Updated title', content: 'Updated content' });

    expect(res.status).toBe(404);
    expect(res.body).toEqual({
      name: 'NotFoundError',
      message: 'Note not found',
    });
  });

  it('should return 422 with invalid body', async () => {
    const { accessToken } = await loginAndRegister();
    const note = await createNote(accessToken);

    let res = await request
      .put(`/api/notes/${note.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({});

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'title',
        message: 'Required',
      },
      {
        path: 'content',
        message: 'Required',
      },
    ]);

    res = await request
      .put(`/api/notes/${note.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ title: '', content: '' });

    expect(res.status).toBe(422);
    expect(res.body.fields).toEqual([
      {
        path: 'title',
        message: 'Should be >= than 1',
      },
      {
        path: 'content',
        message: 'Should be >= than 1',
      },
    ]);
  });

  it('should return 401 without token', async () => {
    const res = await request
      .put('/api/notes/1')
      .send({ title: 'Updated title', content: 'Updated content' });

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      name: 'UnauthorizedError',
      message: 'Missing token',
    });
  });
});

describe('DELETE /notes/:id', () => {
  it('should delete a note', async () => {
    const { accessToken } = await loginAndRegister();
    const note = await createNote(accessToken);

    const res = await request
      .delete(`/api/notes/${note.id}`)
      .set('Authorization', `Bearer ${accessToken}`);

    console.log(res.body);

    expect(res.status).toBe(204);
  });

  it('should return 404 for non existing note', async () => {
    const { accessToken } = await loginAndRegister();

    const res = await request
      .delete('/api/notes/999')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.status).toBe(404);
  });

  it('should return 401 without token', async () => {
    const res = await request.delete('/api/notes/1');

    expect(res.status).toBe(401);
    expect(res.body).toEqual({
      name: 'UnauthorizedError',
      message: 'Missing token',
    });
  });
});
