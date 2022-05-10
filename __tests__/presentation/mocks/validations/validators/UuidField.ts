import { faker } from '@faker-js/faker';

import { IUuidValidator } from '@presentation/validations/protocols';

export class UuidValidatorSpy implements IUuidValidator {
  isValid(_: IUuidValidator.Input): IUuidValidator.Output {
    return true;
  }
}

export function makeUuidFieldValidationFieldName() {
  return faker.database.column();
}
