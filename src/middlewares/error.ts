import {
  Request,
  Response as ExpressResponse,
  NextFunction,
  ErrorRequestHandler,
} from 'express';

import { Response, logger } from '../libs';

export const errorMiddleware = (
  err: ErrorRequestHandler,
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  logger.error(err);
  return Response.send(res, Response.buildError());
};
