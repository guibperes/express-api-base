import { bodyFilterMiddleware } from '../../src/middlewares/bodyFilter';

import { DocumentMock, HTTPMock } from '../mocks';

describe('Middleware bodyFilter', () => {
  test('should filter default parameters', () => {
    const req = HTTPMock.createRequest({
      body: DocumentMock.create({ name: 'Guilherme' }),
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    bodyFilterMiddleware()(req, res, next);

    expect(req.body._id).toBeUndefined();
    expect(req.body.__v).toBeUndefined();
    expect(req.body.createdAt).toBeUndefined();
    expect(req.body.updatedAt).toBeUndefined();
    expect(req.body.name).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });

  test('should filter password parameter', () => {
    const req = HTTPMock.createRequest({
      body: DocumentMock.create({ name: 'Guilherme', password: '112233' }),
    });
    const res = HTTPMock.createResponse();
    const next = HTTPMock.createNextFunction();

    bodyFilterMiddleware('password')(req, res, next);

    expect(req.body._id).toBeUndefined();
    expect(req.body.__v).toBeUndefined();
    expect(req.body.createdAt).toBeUndefined();
    expect(req.body.updatedAt).toBeUndefined();
    expect(req.body.password).toBeUndefined();
    expect(req.body.name).toBeDefined();
    expect(next).toBeCalledTimes(1);
  });
});
