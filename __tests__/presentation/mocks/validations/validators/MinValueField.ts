import { faker } from '@faker-js/faker';

export function makeMinValueFieldValidationFieldName() {
  return faker.database.column();
}

export function makeMinValueFieldValidationMinValue() {
  return faker.datatype.number();
}
