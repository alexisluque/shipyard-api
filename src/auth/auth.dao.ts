import { env } from '../config/env.js';
import { query } from '../db/index.js';
import { UnauthorizedError } from '../error/error.js';
import type { User } from './types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = env.auth;

export const registerDao = async ({ email, password }: User) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await query(
    `INSERT INTO Users(email, password)
    VALUES ($1, $2)
    RETURNING *`,
    [email, hashedPassword],
  );

  return rows[0];
}

export const loginDao = async ({ email, password }: User) => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);

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
}
