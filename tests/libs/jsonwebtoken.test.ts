import { JsonWebToken } from '../../src/libs/jsonwebtoken';

interface TokenData {
  some: string;
}

describe('Lib JsonWebToken', () => {
  test('should module JsonWebToken be defined', () => {
    expect(JsonWebToken).toBeDefined();
  });

  test('should function sign be defined', () => {
    expect(JsonWebToken.sign).toBeInstanceOf(Function);
  });

  test('should function verify be defined', () => {
    expect(JsonWebToken.verify).toBeInstanceOf(Function);
  });

  test('should created a jwt hash', async () => {
    const tokenHash = await JsonWebToken.sign(
      { some: 'data' },
      'secret_hash_key'
    );

    expect(tokenHash).toBeDefined();
    expect(typeof tokenHash).toBe('string');
  });

  test('should created a jwt hash with expiration time', async () => {
    const tokenHash = await JsonWebToken.sign(
      { some: 'data' },
      'secret_hash_key',
      { expiresIn: '12h' }
    );

    expect(tokenHash).toBeDefined();
    expect(typeof tokenHash).toBe('string');
  });

  test('should return a decoded jwt', async () => {
    const tokenHash = await JsonWebToken.sign(
      { some: 'data' },
      'secret_hash_key'
    );

    const decodedToken = await JsonWebToken.verify<TokenData>(
      tokenHash,
      'secret_hash_key'
    );

    expect(decodedToken).toBeDefined();
  });

  test('should throw error on jwt decoding', async () => {
    expect.assertions(1);

    try {
      await JsonWebToken.verify<TokenData>(
        'invalid_token_hash',
        'secret_hash_key'
      );
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
