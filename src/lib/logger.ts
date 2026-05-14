import pino from 'pino';

export const createLogger = () => {
  return pino({
    level: process.env.LOG_LEVEL ?? 'info',
  });
};
