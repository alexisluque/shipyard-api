import { env } from '../../config/env.js';
import { query } from '../db/index.js';
import type { User } from './types.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const { JWT_SECRET } = env.auth;

export async function registerDao({ email, password }: User) {
  const hashedPassword = await bcrypt.hash(password, 10);
  
  await query(`INSERT INTO Users(email, password) VALUES ($1, $2)`, [
    email,
    hashedPassword,
  ]);
}

export async function loginDao({ email, password }: User) {
  const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    const user = result.rows[0];

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
}
