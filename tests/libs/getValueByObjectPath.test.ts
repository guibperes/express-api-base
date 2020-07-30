import { getValueByObjectPath } from '../../src/libs/getValueByObjectPath';

describe('Lib getValueByObjectPath', () => {
  test('should be defined value from object', () => {
    const obj = { someValue: 'someValue' };

    const value = getValueByObjectPath(obj, 'someValue');

    expect(value).toBeDefined();
  });

  test('should be undefined value from object', () => {
    const obj = {};

    const value = getValueByObjectPath(obj, 'someValue');

    expect(value).toBeUndefined();
  });

  test('should be defined value from nested object', () => {
    const obj = { nestedObj: { someValue: 'someValue' } };

    const value = getValueByObjectPath(obj, 'nestedObj', 'someValue');

    expect(value).toBeDefined();
  });

  test('should be undefined value from nested object', () => {
    const obj = { nestedObj: {} };

    const value = getValueByObjectPath(obj, 'nestedObj', 'someValue');

    expect(value).toBeUndefined();
  });
});
