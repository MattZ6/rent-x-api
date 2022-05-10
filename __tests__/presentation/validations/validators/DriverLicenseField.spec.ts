import { faker } from '@faker-js/faker';

import { InvalidDriverLicenseFieldError } from '@presentation/errors';
import { DriverLicenseFieldValidation } from '@presentation/validations/validators';

import {
  DriverLicenseValidatorSpy,
  makeDriverLicenseFieldValidationFieldName,
} from '../../mocks';

let driverLicenseValidatorSpy: DriverLicenseValidatorSpy;
let driverLicenseFieldValidationFieldName: string;

let driverLicenseFieldValidation: DriverLicenseFieldValidation<{
  [key: string]: string;
}>;

describe('DriverLicenseFieldValidation', () => {
  beforeEach(() => {
    driverLicenseValidatorSpy = new DriverLicenseValidatorSpy();
    driverLicenseFieldValidationFieldName =
      makeDriverLicenseFieldValidationFieldName();

    driverLicenseFieldValidation = new DriverLicenseFieldValidation(
      driverLicenseValidatorSpy,
      driverLicenseFieldValidationFieldName
    );
  });

  it('should call DriverLicenseValidator once with correct values', async () => {
    const isValidSpy = jest.spyOn(driverLicenseValidatorSpy, 'isValid');

    const driver_license = faker.datatype.string();

    driverLicenseFieldValidation.validate({
      [driverLicenseFieldValidationFieldName]: `   ${driver_license}     `,
    });

    expect(isValidSpy).toHaveBeenCalledWith({ driver_license });
    expect(isValidSpy).toHaveBeenCalledTimes(1);
  });

  it('should return InvalidDriverLicenseFieldError if DriverLicenseValidator returns false', async () => {
    jest.spyOn(driverLicenseValidatorSpy, 'isValid').mockReturnValueOnce(false);

    const output = driverLicenseFieldValidation.validate({});

    expect(output).toEqual(
      new InvalidDriverLicenseFieldError(driverLicenseFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = driverLicenseFieldValidation.validate({
      [driverLicenseFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toBeNull();
  });
});
