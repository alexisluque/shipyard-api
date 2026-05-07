import { pinoHttp } from 'pino-http';
import type { Logger } from 'pino';

export const createHttpLogger = (logger: Logger) =>
  pinoHttp({
    logger,

    genReqId: (req) => {
      return (req.headers['x-request-id'] as string) || crypto.randomUUID();
    },

    customLogLevel: (_req, res, err) => {
      if (err || res.statusCode >= 500) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },

    serializers: {
      req: (req) => ({
        id: req.id,
        method: req.method,
        url: req.url,
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  });
