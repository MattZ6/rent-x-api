import { faker } from '@faker-js/faker';

export function makeOnlyNumbersFieldValidationFieldName() {
  return faker.database.column();
}
