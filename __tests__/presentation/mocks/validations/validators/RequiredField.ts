import { faker } from '@faker-js/faker';

export function makeRequiredFieldValidationFieldName() {
  return faker.database.column();
}
