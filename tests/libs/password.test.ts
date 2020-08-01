import { Password } from '../../src/libs/password';

describe('Lib Password', () => {
  test('should module Password be defined', () => {
    expect(Password).toBeDefined();
  });

  test('should function hash be defined', () => {
    expect(Password.hash).toBeInstanceOf(Function);
  });

  test('should function compare be defined', () => {
    expect(Password.compare).toBeInstanceOf(Function);
  });

  test('should return hashed password with default rounds', async () => {
    const password = 'my_password';
    const passwordHash = await Password.hash(password);

    expect(password === passwordHash).toBeFalsy();
  });

  test('should return hashed password with specified rounds', async () => {
    const password = 'my_password';
    const passwordHash = await Password.hash(password, 5);

    expect(password === passwordHash).toBeFalsy();
  });

  test('should password compare return true', async () => {
    const password = 'my_password';
    const passwordHash = await Password.hash(password);
    const passwordCompare = await Password.compare(password, passwordHash);

    expect(passwordCompare).toBeTruthy();
  });

  test('should password compare return false', async () => {
    const password = 'my_password';
    const passwordHash = 'not_a_real_hash';
    const passwordCompare = await Password.compare(password, passwordHash);

    expect(passwordCompare).toBeFalsy();
  });
});
