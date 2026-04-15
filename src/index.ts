import { createApp } from './app.js';
import { env } from './config/env.js';

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = env.db;

const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const app = createApp({
  connectionString,
});

app.listen(env.PORT, () => {
  console.log('App listening on port', env.PORT);
});
