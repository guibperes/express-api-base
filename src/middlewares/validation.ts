import * as Yup from 'yup';
import mongoose from 'mongoose';
import { Request, Response as ExpressResponse, NextFunction } from 'express';

import { Response, HttpStatus, getValueByObjectPath } from '../libs';

const validateObjectId = (...idPath: string[]) => async (
  req: Request,
  res: ExpressResponse,
  next: NextFunction
) => {
  const idParameterValue = getValueByObjectPath(req, ...idPath);
  const isValidObjectId = mongoose.isValidObjectId(idParameterValue);

  if (!idParameterValue || !isValidObjectId) {
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
