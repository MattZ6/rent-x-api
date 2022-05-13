import { faker } from '@faker-js/faker';

export function makeValidDateIntervalFieldValidationFieldName() {
  return faker.database.column();
}
