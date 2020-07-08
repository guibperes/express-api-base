import { logger, loggerMiddleware } from '../../src/libs/logger';

describe('Lib Logger', () => {
  test('should logger be a object', () => {
    expect(logger).toBeDefined();
  });

  test('should loggerMiddleware be a function', () => {
    expect(loggerMiddleware).toBeInstanceOf(Function);
  });
});
