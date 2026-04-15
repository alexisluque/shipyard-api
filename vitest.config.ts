import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      PORT: '3001',
      DATABASE_URL:
        'postgresql://postgres:postgres@localhost:5433/shipyard_test',
    },
    fileParallelism: false,
    isolate: false,
  },
});
