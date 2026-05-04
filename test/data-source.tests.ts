import { DataSource } from 'typeorm';
import { createBaseOptions } from '../src/db/base-data-source.js';
// import { testMigrations } from './test-migrations.js';

export const createTestDataSource = ({ url }: { url: string }) => {
  return new DataSource({
    ...createBaseOptions(url),
    // migrations: testMigrations,
  });
};
