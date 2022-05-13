import { faker } from '@faker-js/faker';

export function makeUuidFieldValidationFieldName() {
  return faker.database.column();
}
