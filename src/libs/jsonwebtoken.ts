import jwt, { Secret, SignOptions, VerifyOptions } from 'jsonwebtoken';

export interface JsonWebToken<T> {
  data: T;
}

const sign = async (
  tokenData: object,
  jwtHashKey: Secret,
  options: SignOptions = {}
) => jwt.sign(tokenData, jwtHashKey, options);

const verify = async <TokenData>(
  token: string,
  jwtHashKey: Secret,
  options: VerifyOptions = {}
) => jwt.verify(token, jwtHashKey, options) as JsonWebToken<TokenData>;

export const JsonWebToken = { sign, verify };
