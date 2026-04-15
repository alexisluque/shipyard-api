import { Pool, type PoolConfig, type QueryResultRow } from 'pg';
import { InternalServerError } from '../error/error.js';

let pool: Pool;

export function initDb(config: PoolConfig) {
  pool = new Pool(config);
}

export function query<T extends QueryResultRow>(
  text: string,
  params: unknown[],
) {
  if (!pool) throw new InternalServerError('Database pool is not initialized');

  return pool.query<T>(text, params);
}

export async function end() {
  if (!pool) throw new InternalServerError('Database pool is not initialized');

  await pool.end();
}
