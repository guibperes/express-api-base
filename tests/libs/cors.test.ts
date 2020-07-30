import { Cors } from '../../src/libs/cors';

describe('Lib Cors', () => {
  test('should module cors be defined', () => {
    expect(Cors).toBeDefined();
  });

  test('should function config be defined', () => {
    expect(Cors.config).toBeDefined();
  });

  test('should return express handler', () => {
    const handler = Cors.config();

    expect(handler).toBeInstanceOf(Function);
  });
});
