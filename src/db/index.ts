import { Pool } from 'pg';
import { env } from '../config/env.js';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = env.db;

const pool = new Pool({
  host: DB_HOST,
  database: DB_NAME,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
});

export const query = (text: string, params: string[]) => {
  return pool.query(text, params);
};
