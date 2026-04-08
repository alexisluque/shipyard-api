import dotenv from 'dotenv';

dotenv.config();

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env variable: ${name}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 3000,
  db: {
    DB_HOST: required('DB_HOST'),
    DB_PORT: Number(process.env.POSTGRES_PORT) || 5432,
    DB_USER: required('POSTGRES_USER'),
    DB_PASSWORD: required('POSTGRES_PASSWORD'),
    DB_NAME: required('POSTGRES_DB'),
  }
};
