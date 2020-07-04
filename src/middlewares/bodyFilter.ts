import { Request, Response, NextFunction } from 'express';

export const bodyFilterMiddleware = (...paramsToRemove: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const params = ['_id', '__v', 'createdAt', 'updatedAt', ...paramsToRemove];

  const filteredBody = params.reduce(
    (acc, value) => ({ ...acc, [value]: undefined }),
    req.body
  );

  req.body = Object.keys(filteredBody)
    .filter(item => filteredBody[item])
    .reduce((acc, value) => ({ ...acc, [value]: filteredBody[value] }), {});

  return next();
};
