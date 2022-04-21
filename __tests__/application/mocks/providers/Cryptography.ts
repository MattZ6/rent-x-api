import { faker } from '@faker-js/faker';

import {
  IEncryptProvider,
  IVerifyCriptographyProvider,
} from '@application/protocols/providers/cryptography/cryptography';
import {
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@application/protocols/providers/cryptography/hash';

export function makeGenerateHashProviderOutputMock(): IGenerateHashProvider.Output {
  return faker.internet.password();
}

export class GenerateHashProviderSpy implements IGenerateHashProvider {
  async hash(
    _: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output> {
    return makeGenerateHashProviderOutputMock();
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

export function makeVerifyCriptographyProviderOutputMock<
  T = unknown
>(): IVerifyCriptographyProvider.Output<T> {
  return {
    subject: faker.datatype.string(),
    payload: {} as T,
  };
}

export class VerifyCriptographyProviderSpy
  implements IVerifyCriptographyProvider
{
  async verify<T = unknown>(
    _: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output<T>> {
    return makeVerifyCriptographyProviderOutputMock<T>();
  }
}
