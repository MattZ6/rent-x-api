import { compare, hash } from 'bcryptjs';

import {
  CompareHashDTO,
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/providers/cryptography/hash';

export class BcryptjsHashProvider
  implements IGenerateHashProvider, ICompareHashProvider
{
  constructor(private readonly salt: number) {}

  async hash(value: string): Promise<string> {
    return hash(value, this.salt);
  }

  async compare(data: CompareHashDTO): Promise<boolean> {
    const { value, value_to_compare } = data;

    return compare(value, value_to_compare);
  }
}
