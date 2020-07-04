import pino from 'pino';
import expressPino from 'express-pino-logger';

export const logger = pino({
  redact: {
    remove: true,
    paths: [
      'hostname',
      'req.id',
      'req.headers',
      'req.remoteAddress',
      'req.remotePort',
      'res.headers',
    ],
  },
});

export const loggerMiddleware = expressPino({ logger });
