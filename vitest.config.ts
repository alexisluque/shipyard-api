import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['test/**/*.spec.ts'],
    exclude: ['dist/**'],
    setupFiles: ['./vitest.setup.ts'],
    fileParallelism: false,
    isolate: false,
  },
});
