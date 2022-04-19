import { faker } from '@faker-js/faker';

import { IGenerateUuidProvider } from '@application/protocols/providers/uuid';

export function makeGenerateUuidProviderOutputMock(): IGenerateUuidProvider.Output {
  return faker.datatype.uuid();
}

export class GenerateUuidProviderSpy implements IGenerateUuidProvider {
  async generate(): Promise<IGenerateUuidProvider.Output> {
    return makeGenerateUuidProviderOutputMock();
  }
}
