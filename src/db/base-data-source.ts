import type { DataSourceOptions } from 'typeorm';
import { entities } from './config.js';

export const createBaseOptions = (url: string): DataSourceOptions => ({
  type: 'postgres',
  url,
  entities,
  synchronize: false,
  logging: false,
});
