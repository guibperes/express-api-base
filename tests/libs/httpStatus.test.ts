import { HttpStatus } from '../../src/libs/httpStatus';

describe('Lib HttpStatus', () => {
  test('should be CREATED status name and code', () => {
    const status = HttpStatus.CREATED;

    expect(status.name).toBe('Created');
    expect(status.number).toBe(201);
  });

  test('should be OK status name and code', () => {
    const status = HttpStatus.OK;

    expect(status.name).toBe('Ok');
    expect(status.number).toBe(200);
  });

  test('should be BAD REQUEST status name and code', () => {
    const status = HttpStatus.BAD_REQUEST;

    expect(status.name).toBe('Bad Request');
    expect(status.number).toBe(400);
  });

  test('should be UNAUTHORIZED status name and code', () => {
    const status = HttpStatus.UNAUTHORIZED;

    expect(status.name).toBe('Unauthorized');
    expect(status.number).toBe(401);
  });

  test('should be FORBIDDEN status name and code', () => {
    const status = HttpStatus.FORBIDDEN;

    expect(status.name).toBe('Forbidden');
    expect(status.number).toBe(403);
  });

  test('should be NOT FOUND status name and code', () => {
    const status = HttpStatus.NOT_FOUND;

    expect(status.name).toBe('Not Found');
    expect(status.number).toBe(404);
  });

  test('should be CONFLICT status name and code', () => {
    const status = HttpStatus.CONFLICT;

    expect(status.name).toBe('Conflict');
    expect(status.number).toBe(409);
  });

  test('should be INTERNAL SERVER ERROR status name and code', () => {
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    expect(status.name).toBe('Internal Server Error');
    expect(status.number).toBe(500);
  });
});
