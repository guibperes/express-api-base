import { MongoDB } from '../../src/base/mongodb';

describe('Base MongoDB', () => {
  test('should MongoDB module be defined', () => {
    expect(MongoDB).toBeDefined();
  });

  test('should function connect be defined', () => {
    expect(MongoDB.connect).toBeInstanceOf(Function);
  });

  test('should function disconnect be defined', () => {
    expect(MongoDB.disconnect).toBeInstanceOf(Function);
  });
});
