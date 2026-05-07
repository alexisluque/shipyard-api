import 'dotenv/config';
import { createApp } from './app/app.js';

import 'reflect-metadata';
import { createAppDataSource } from './db/data-source.js';
import { createLogger } from './lib/logger.js';

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const db = createAppDataSource({ url: process.env.DATABASE_URL });
  await db.initialize();

  const logger = createLogger();

  const app = await createApp({ db, logger });

  app.listen(process.env.PORT, () => {
    logger.info(`App listening on port: ${process.env.PORT}`);
  });
};

main().catch((error) => console.error(error));
