import { sign } from 'jsonwebtoken';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography';

export class JWTCryptographyProvider implements IEncryptProvider {
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
}
