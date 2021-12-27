import { hash } from 'bcryptjs';

import { IGenerateHashProvider } from '@data/protocols/providers/cryptography/hash';

export class BcryptjsHashProvider implements IGenerateHashProvider {
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }
}
