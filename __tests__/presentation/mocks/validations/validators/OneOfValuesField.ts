import { faker } from '@faker-js/faker';

export function makeOneOfValuesFieldValidationFieldName() {
  return faker.database.column();
}

export function makeOneOfValuesFieldValidationValues() {
  return faker.helpers.arrayElements<string>();
}
