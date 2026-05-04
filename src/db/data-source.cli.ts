import 'reflect-metadata';

import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config({
  path: process.env.ENV_FILE || '.env',
});

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}

const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,

  synchronize: false,
  logging: false,

  entities: ['dist/src/**/*.entity.js'],
  migrations: ['dist/**/migrations/*.js'],
});

export default dataSource;
