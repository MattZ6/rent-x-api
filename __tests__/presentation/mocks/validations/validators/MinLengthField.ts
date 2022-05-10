import { faker } from '@faker-js/faker';

export function makeMinLengthFieldValidationFieldName() {
  return faker.database.column();
}

export function makeMinLengthFieldValidationMinLength() {
  return faker.datatype.number({ min: 1 });
}
