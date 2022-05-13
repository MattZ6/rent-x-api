import { faker } from '@faker-js/faker';

export function makeCompareFieldsValidationFieldName() {
  return faker.database.column();
}

export function makeCompareFieldsValidationFieldToCompareName() {
  return faker.git.branch();
}
