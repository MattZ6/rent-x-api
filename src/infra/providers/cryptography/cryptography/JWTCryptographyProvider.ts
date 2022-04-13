import {
  JsonWebTokenError,
  JwtPayload,
  sign,
  TokenExpiredError as JWTTokenExpiredError,
  verify,
} from 'jsonwebtoken';

import {
  IEncryptProvider,
  IVerifyCriptographyProvider,
} from '@application/protocols/providers/cryptography/cryptography';

import { InvalidTokenError, TokenExpiredError } from '@presentation/errors';

export class JWTCryptographyProvider
  implements IEncryptProvider, IVerifyCriptographyProvider
{
  constructor(
    private readonly secret: string,
    private readonly expiresInSeconds: number
  ) {}

  async encrypt(
    data: IEncryptProvider.Input
  ): Promise<IEncryptProvider.Output> {
    const { value } = data;

    return sign({}, this.secret, {
      subject: value,
      expiresIn: this.expiresInSeconds,
    });
  }

  async verify<T = any>(
    data: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output<T>> {
    const { value } = data;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { sub, aud, exp, iat, iss, jti, nbf, ...rest } = verify(
        value,
        this.secret
      ) as JwtPayload;

      return { subject: String(sub), payload: rest as T };
    } catch (error) {
      if (error instanceof JWTTokenExpiredError) {
        throw new TokenExpiredError();
      }

      if (error instanceof JsonWebTokenError) {
        throw new InvalidTokenError();
      }

      throw error;
    }
  }
}
