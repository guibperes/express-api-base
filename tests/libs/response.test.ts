import { HttpStatus } from '../../src/libs/httpStatus';
import { Response } from '../../src/libs/response';

import { HTTPMock } from '../mocks';

describe('Lib Response', () => {
  test('should return a success response', () => {
    const response = Response.build({ name: 'Guilherme' });

    expect(response.content).toBeDefined();
    expect(response.content).toHaveProperty('name');
  });

  test('should return a default error response', () => {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const response = Response.buildError();

    expect(response.error).toBeDefined();
    expect(response.error?.data).toBeDefined();
    expect(response.error?.status).toBe(status.number);
    expect(response.error?.data.name).toBe(status.name);
    expect(response.error?.data.message).toBe(
      'Internal Server Error, contact the dev'
    );
  });

  test('should return a error response', () => {
    const status = HttpStatus.BAD_REQUEST;
    const response = Response.buildError('Error message', status);

    expect(response.error).toBeDefined();
    expect(response.error?.data).toBeDefined();
    expect(response.error?.status).toBe(status.number);
    expect(response.error?.data.name).toBe(status.name);
    expect(response.error?.data.message).toBe('Error message');
  });

  test('should send a success response', () => {
    const res = HTTPMock.createResponse();
    const result = Response.send(res, Response.build({ name: 'Guilherme' }));

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(200);
  });

  test('should send a error response', () => {
    const res = HTTPMock.createResponse();
    const result = Response.send(
      res,
      Response.buildError('Error message', HttpStatus.BAD_REQUEST)
    );

    expect(result).toBeDefined();
    expect(result.statusCode).toBe(400);
  });
});
