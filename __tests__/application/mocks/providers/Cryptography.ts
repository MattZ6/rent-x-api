import { faker } from '@faker-js/faker';

import { IEncryptProvider } from '@application/protocols/providers/cryptography/cryptography';
import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@application/protocols/providers/cryptography/hash';

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

export function makeEncryptProviderOutputMock(): IEncryptProvider.Output {
  return faker.datatype.string();
}
export class EncryptProviderSpy implements IEncryptProvider<unknown> {
  async encrypt(
    _: IEncryptProvider.Input<unknown>
  ): Promise<IEncryptProvider.Output> {
    return makeEncryptProviderOutputMock();
  }
}
