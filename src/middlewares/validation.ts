import * as Yup from 'yup';
import mongoose from 'mongoose';
import { Request, Response as ExpressResponse, NextFunction } from 'express';

import { Response, HttpStatus } from '../libs';

const validateObjectId = async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  const isValidObjectId = mongoose.isValidObjectId(req.params.id);

  if (!isValidObjectId) {
    return Response.send(
      res,
      Response.buildError('Invalid id parameter', HttpStatus.BAD_REQUEST)
    );
  }

  return next();
};

const validateBody = (validator: Yup.ObjectSchema) => async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  try {
    await validator.validate(req.body, { abortEarly: false });
    return next();
  } catch (error) {
    return Response.send(
      res,
      Response.buildError(error.errors.join(', '), HttpStatus.BAD_REQUEST)
    );
  }
};

export const Validations = { validateObjectId, validateBody };
