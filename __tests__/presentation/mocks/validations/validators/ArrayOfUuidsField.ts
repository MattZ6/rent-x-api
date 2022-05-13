import { faker } from '@faker-js/faker';

export function makeArrayOfUuidsFieldValidationFieldName() {
  return faker.database.column();
}
