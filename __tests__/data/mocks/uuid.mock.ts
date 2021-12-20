import faker from 'faker';

import { IGenerateUuidProvider } from '@data/protocols/providers/uuid';

export class GenerateUuidProviderSpy implements IGenerateUuidProvider {
  async generate(): Promise<string> {
    return faker.datatype.uuid();
  }
}
