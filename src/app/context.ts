import type { Logger } from 'pino';
import { DataSource } from 'typeorm';

export type AppContext = {
  logger: Logger;
  db: DataSource;
};
