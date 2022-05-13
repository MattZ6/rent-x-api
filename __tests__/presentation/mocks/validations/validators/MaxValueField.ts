import { faker } from '@faker-js/faker';

export function makeMaxValueFieldValidationFieldName() {
  return faker.database.column();
}

export function makeMaxValueFieldValidationMaxValue() {
  return faker.datatype.number();
}
