import { resolve } from 'path';
import { DotEnv } from '../../src/libs/dotenv';

describe('Lib DotEnv', () => {
  test('should module DotEnv be defined', () => {
    expect(DotEnv).toBeDefined();
  });

  test('should function config be defined', () => {
    expect(DotEnv.config).toBeInstanceOf(Function);
  });

  test('should function envToString be defined', () => {
    expect(DotEnv.envToString).toBeInstanceOf(Function);
  });

  test('should function config configure env variables and return a object', () => {
    const config = DotEnv.config({
      path: resolve(__dirname, '..', 'mocks', 'test.env'),
    });

    expect(process.env.FILE_TEST).toBeDefined();
    expect(config).toBeDefined();
  });

  test('should return the defined value on MY_TEST env variable', () => {
    process.env.MY_TEST = 'SOME_TEST_VALUE';

    const envValue = DotEnv.envToString('MY_TEST');

    expect(envValue).toBeDefined();
    expect(typeof envValue).toBe('string');
    expect(envValue).toBe(process.env.MY_TEST);
  });

  test('should return empty string on MY_TEST env variable', () => {
    process.env.MY_TEST = undefined;

    const envValue = DotEnv.envToString('MY_TEST');

    expect(envValue).toBeDefined();
    expect(typeof envValue).toBe('string');
  });
});
