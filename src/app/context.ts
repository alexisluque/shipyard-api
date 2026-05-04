import { DataSource } from 'typeorm';

export type AppContext = {
  db: DataSource;
};
