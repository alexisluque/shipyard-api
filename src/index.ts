import 'dotenv/config';
import { createApp } from './app/app.js';

import 'reflect-metadata';
import { createAppDataSource } from './db/data-source.js';

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined');
  }

  const db = createAppDataSource({ url: process.env.DATABASE_URL });
  await db.initialize();

  const app = await createApp({ db });

  app.listen(process.env.PORT, () => {
    console.log('App listening on port', process.env.PORT);
  });
};

main().catch((error) => console.error(error));
