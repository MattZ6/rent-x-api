import { faker } from '@faker-js/faker';

import { IDriverLicenseValidator } from '@presentation/validations/protocols';

export class DriverLicenseValidatorSpy implements IDriverLicenseValidator {
  isValid(_: IDriverLicenseValidator.Input): IDriverLicenseValidator.Output {
    return true;
  }
}

export function makeDriverLicenseFieldValidationFieldName() {
  return faker.database.column();
}
