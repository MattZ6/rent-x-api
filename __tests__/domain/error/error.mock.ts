import { faker } from '@faker-js/faker';

export function makeErrorMock() {
  return new Error(faker.datatype.string());
}
