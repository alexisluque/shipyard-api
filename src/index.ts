import 'dotenv/config';
import { createApp } from './app/app.js';

import 'reflect-metadata';
import { createAppDataSource } from './db/data-source.js';
import { createLogger } from './lib/logger.js';
import { createServer } from 'node:http';

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const db = createAppDataSource({ url: process.env.DATABASE_URL });
  await db.initialize();

  const logger = createLogger();

  const app = await createApp({ db, logger });

  const server = createServer(app);

  server.listen(process.env.PORT, () => {
    logger.info(`App listening on port: ${process.env.PORT}`);
  });

  async function shutdown(signal: string) {
    logger.info(`${signal} received, shutting down gracefully`);

    server.close(async () => {
      logger.info('HTTP server closed');

      await db.destroy();

      logger.info('Database connection closed');

      process.exit(0);
    });

    // force shutdown after timeout
    setTimeout(() => {
      logger.error('Forced shutdown');

      process.exit(1);
    }, 10000).unref();
  }

  process.on('SIGINT', () => void shutdown('SIGINT'));
  process.on('SIGTERM', () => void shutdown('SIGTERM'));
};

main().catch((error) => console.error(error));
