import { env } from '../config/env.js';
import { query } from '../db/index.js';
import { ConflictError, UnauthorizedError } from '../error/error.js';
import type { User } from './types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { LoginType } from './auth.schema.js';

const { JWT_SECRET } = env.auth;

export const registerDao = async ({ email, password }: LoginType) => {
  const { rows: emailRows } = await query(
    `SELECT 1
    FROM users
    WHERE email=$1`,
    [email],
  );

  if (emailRows[0]) {
    throw new ConflictError('Email already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await query<User>(
    `INSERT INTO Users(email, password)
    VALUES ($1, $2)
    RETURNING *`,
    [email, hashedPassword],
  );

  return rows[0]!;
};

export const loginDao = async ({ email, password }: LoginType) => {
  const { rows } = await query<{ id: string, password: string }>(
    `SELECT id, password
    FROM users
    WHERE email=$1`,
    [email],
  );

  const user = rows[0];

  if (!user) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new UnauthorizedError('Invalid credentials');
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

  return token;
};
