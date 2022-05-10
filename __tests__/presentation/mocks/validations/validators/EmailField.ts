import { faker } from '@faker-js/faker';

import { IEmailValidator } from '@presentation/validations/protocols';

export class EmailValidatorSpy implements IEmailValidator {
  isValid(_: IEmailValidator.Input): IEmailValidator.Output {
    return true;
  }
}

export function makeEmailFieldValidationFieldName() {
  return faker.database.column();
}
