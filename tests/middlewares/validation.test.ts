import * as Yup from 'yup';
import mongoose from 'mongoose';

import { Validations } from '../../src/middlewares/validation';
import { HTTPMock } from '../mocks';

describe('Middleware Validations', () => {
  test('should be valid ObjectId in path req.params.id and call next function', async () => {
    const req = HTTPMock.createRequest({
      params: {
        id: mongoose.Types.ObjectId(),
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('params', 'id')(req, res, next);

    expect(req.params.id).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });

  test('should be invalid ObjectId in path req.params.id and return error', async () => {
    const req = HTTPMock.createRequest({
      params: {
        id: '1122334455',
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('params', 'id')(req, res, next);

    expect(req.params.id).toBeDefined();
    expect(next).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
  });

  test('should be valid ObjectId in path req.anotherId and call next function', async () => {
    const req = HTTPMock.createRequest({
      anotherId: mongoose.Types.ObjectId(),
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('anotherId')(req, res, next);

    expect(req.anotherId).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });

  test('should be invalid ObjectId in path req.anotherId and return error', async () => {
    const req = HTTPMock.createRequest({
      anotherId: 1122334455,
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('anotherId')(req, res, next);

    expect(req.anotherId).toBeDefined();
    expect(next).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
  });

  test('should be valid ObjectId in path req.nestedObj.anotherId and call next function', async () => {
    const req = HTTPMock.createRequest({
      nestedObj: {
        anotherId: mongoose.Types.ObjectId(),
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('nestedObj', 'anotherId')(req, res, next);

    expect(req.nestedObj.anotherId).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });

  test('should be invalid ObjectId in path req.nestedObj.anotherId and return error', async () => {
    const req = HTTPMock.createRequest({
      nestedObj: {
        anotherId: 1122334455,
      },
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('nestedObj', 'anotherId')(req, res, next);

    expect(req.nestedObj.anotherId).toBeDefined();
    expect(next).toBeCalledTimes(0);
    expect(res.statusCode).toBe(400);
  });

  test('should be undefined ObjectId and return error', async () => {
    const req = HTTPMock.createRequest();
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    Validations.validateObjectId('undefinedObj')(req, res, next);

    expect(req.undefinedObj).toBeUndefined();
    expect(req.params.id).toBeUndefined();
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
