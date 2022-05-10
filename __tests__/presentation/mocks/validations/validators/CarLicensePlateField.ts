import { faker } from '@faker-js/faker';

import { ICarLicensePlateValidator } from '@presentation/validations/protocols';

export class CarLicensePlateValidatorSpy implements ICarLicensePlateValidator {
  isValid(
    _: ICarLicensePlateValidator.Input
  ): ICarLicensePlateValidator.Output {
    return true;
  }
}

export function makeCarLicensePLateFieldValidationFieldName() {
  return faker.database.column();
}
