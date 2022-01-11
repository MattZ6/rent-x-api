import faker from 'faker';

import {
  EncryptPayload,
  IEncryptProvider,
} from '@data/protocols/providers/cryptography/cryptography';
import {
  CompareHashDTO,
  ICompareHashProvider,
  IGenerateHashProvider,
} from '@data/protocols/providers/cryptography/hash';

export class GenerateHashProviderSpy implements IGenerateHashProvider {
  async hash(_: string): Promise<string> {
    return faker.internet.password();
  }
}

export class CompareHashProviderSpy implements ICompareHashProvider {
  async compare(_: CompareHashDTO): Promise<boolean> {
    return true;
  }
}

export class EncryptProviderSpy implements IEncryptProvider {
  async encrypt(_: EncryptPayload): Promise<string> {
    return faker.datatype.uuid();
  }
}
