import { Response as ExpressResponse } from 'express';

import { HttpStatus } from './httpStatus';

interface ErrorData {
  timestamp: number;
  name: string;
  message: string;
}

interface Error {
  status: number;
  data: ErrorData;
}

export interface Response {
  error?: Error;
  content?: object;
}

const buildError = (
  message = 'Internal Server Error, contact the dev',
  status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR
): Response => ({
  error: {
    status: status.number,
    data: {
      timestamp: Date.now(),
      name: status.name,
      message,
    },
  },
});

const build = (content: object): Response => ({ content });

const send = (res: ExpressResponse, result: Response) =>
  result.error
    ? res.status(result.error.status).json(result.error.data)
    : res.json(result.content);

export const Response = { buildError, build, send };
