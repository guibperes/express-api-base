import * as Yup from 'yup';
import mongoose from 'mongoose';

import { Validations } from '../../src/middlewares/validation';
import { HTTPMock } from '../mocks';

describe('Middleware Validations', () => {
  test('should be valid ObjectId and call next function', async () => {
    const req = HTTPMock.createRequest({
      params: {
        id: mongoose.Types.ObjectId(),
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId(req, res, next);

    expect(req.params.id).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });

  test('should be invalid ObjectId and return error', async () => {
    const req = HTTPMock.createRequest({
      params: {
        id: '1122334455',
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId(req, res, next);

    expect(req.params.id).toBeDefined();
    expect(next).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
  });

  test('should be valid body according to the yup validator', async () => {
    const validator = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    });
    const req = HTTPMock.createRequest({
      body: {
        name: 'Guilherme Beidaki',
        password: '112233',
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    await Validations.validateBody(validator)(req, res, next);

    expect(req.body).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });

  test('should be invalid body according to the yup validator', async () => {
    const validator = Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    });
    const req = HTTPMock.createRequest({
      body: {
        name: 'Guilherme Beidaki',
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    await Validations.validateBody(validator)(req, res, next);

    expect(req.body).toBeDefined();
    expect(next).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
  });
});
