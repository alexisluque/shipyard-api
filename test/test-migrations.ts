import * as migrationsModule from '../src/db/migrations/index.js';

export const testMigrations = Object.values(migrationsModule).filter(
  (m: unknown) =>
    typeof m === 'function' &&
    m.prototype &&
    'up' in m.prototype &&
    'down' in m.prototype,
);
