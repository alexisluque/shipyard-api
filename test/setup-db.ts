import { DataSource } from 'typeorm';

export const resetDatabase = async (ds: DataSource) => {
  await ds.query(`TRUNCATE TABLE notes, users CASCADE`);
};
