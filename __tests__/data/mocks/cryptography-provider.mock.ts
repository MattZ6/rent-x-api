import faker from 'faker';

import { IGenerateHashProvider } from '@data/protocols/providers/cryptography/hash';

export class GenerateHashProviderSpy implements IGenerateHashProvider {
  async hash(_: string): Promise<string> {
    return faker.internet.password();
  }
}
