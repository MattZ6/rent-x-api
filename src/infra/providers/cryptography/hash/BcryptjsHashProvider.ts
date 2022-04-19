import { compare, hash } from 'bcryptjs';

import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@application/protocols/providers/cryptography/hash';

export class BcryptjsHashProvider
  implements IGenerateHashProvider, ICompareHashProvider
{
  constructor(private readonly salt: number) {}

  async hash(
    data: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output> {
    const { value } = data;

    return hash(value, this.salt);
  }

  async compare(
    data: ICompareHashProvider.Input
  ): Promise<ICompareHashProvider.Output> {
    const { value, hashed_value: value_to_compare } = data;

    return compare(value, value_to_compare);
  }
}
