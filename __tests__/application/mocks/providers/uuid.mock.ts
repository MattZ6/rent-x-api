import { faker } from '@faker-js/faker';

import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';

export class GenerateUuidProviderSpy implements IGenerateUuidProvider {
  async generate(): Promise<IGenerateUuidProvider.Output> {
    return faker.datatype.uuid();
  }
}
