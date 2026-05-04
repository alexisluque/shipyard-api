import { DataSource } from 'typeorm';
import { createBaseOptions } from './base-data-source.js';
export let AppDataSource: DataSource;

export const createAppDataSource = ({ url }: { url: string }) => {
  return new DataSource({
    ...createBaseOptions(url),
  });
};
