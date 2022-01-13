import faker from 'faker';

import { IEncryptProvider } from '@data/protocols/providers/cryptography/cryptography';
import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/providers/cryptography/hash';

export class GenerateHashProviderSpy implements IGenerateHashProvider {
  async hash(
    _: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output> {
    return faker.internet.password();
  }
}

export class CompareHashProviderSpy implements ICompareHashProvider {
  async compare(
    _: ICompareHashProvider.Input
  ): Promise<ICompareHashProvider.Output> {
    return true;
  }
}

export class EncryptProviderSpy implements IEncryptProvider {
  async encrypt(_: IEncryptProvider.Input): Promise<IEncryptProvider.Output> {
    return faker.datatype.uuid();
  }
}
