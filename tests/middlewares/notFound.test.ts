import { notFoundMiddleware } from '../../src/middlewares/notFound';

import { HTTPMock } from '../mocks';

describe('Middeware notFound', () => {
  test('should return 404 error', () => {
    const req = HTTPMock.createRequest();
    const res = HTTPMock.createResponse();

    notFoundMiddleware(req, res);

    expect(res.statusCode).toBe(404);
  });
});
