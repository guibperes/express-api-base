import { Request, Response as ExpressResponse } from 'express';

import { Response, HttpStatus } from '../libs';

export const notFoundMiddleware = (req: Request, res: ExpressResponse) =>
  Response.send(
    res,
    Response.buildError(
      'Route not provided by this service',
      HttpStatus.NOT_FOUND
    )
  );
