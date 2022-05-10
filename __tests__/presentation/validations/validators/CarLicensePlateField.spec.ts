import { faker } from '@faker-js/faker';

import { InvalidLicensePlateFieldError } from '@presentation/errors';
import { LicensePlateFieldValidation } from '@presentation/validations/validators';

import {
  CarLicensePlateValidatorSpy,
  makeCarLicensePLateFieldValidationFieldName,
} from '../../mocks';

let carLicensePlateValidatorSpy: CarLicensePlateValidatorSpy;
let carLicensePlateFieldValidationFieldName: string;

let carLicensePlateFieldValidation: LicensePlateFieldValidation<{
  [key: string]: string;
}>;

describe('LicensePlateFieldValidation', () => {
  beforeEach(() => {
    carLicensePlateValidatorSpy = new CarLicensePlateValidatorSpy();
    carLicensePlateFieldValidationFieldName =
      makeCarLicensePLateFieldValidationFieldName();

    carLicensePlateFieldValidation = new LicensePlateFieldValidation(
      carLicensePlateValidatorSpy,
      carLicensePlateFieldValidationFieldName
    );
  });

  it('should call CarLicensePlateValidator once with correct values', async () => {
    const isValidSpy = jest.spyOn(carLicensePlateValidatorSpy, 'isValid');

    const license_plate = faker.datatype.string();

    carLicensePlateFieldValidation.validate({
      [carLicensePlateFieldValidationFieldName]: `   ${license_plate}     `,
    });

    expect(isValidSpy).toHaveBeenCalledWith({ license_plate });
    expect(isValidSpy).toHaveBeenCalledTimes(1);
  });

  it('should return InvalidLicensePlateFieldError if CarLicensePlateValidator returns false', async () => {
    jest
      .spyOn(carLicensePlateValidatorSpy, 'isValid')
      .mockReturnValueOnce(false);

    const output = carLicensePlateFieldValidation.validate({});

    expect(output).toEqual(
      new InvalidLicensePlateFieldError(carLicensePlateFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = carLicensePlateFieldValidation.validate({
      [carLicensePlateFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toBeNull();
  });
});
