import { faker } from '@faker-js/faker';

import { InvalidUuidFieldError } from '@presentation/errors';
import { UuidFieldValidation } from '@presentation/validations/validators';

import {
  UuidValidatorSpy,
  makeUuidFieldValidationFieldName,
} from '../../mocks';

let uuidValidatorSpy: UuidValidatorSpy;
let uuidFieldValidationFieldName: string;

let uuidFieldValidation: UuidFieldValidation<{
  [key: string]: string;
}>;

describe('UuidFieldValidation', () => {
  beforeEach(() => {
    uuidValidatorSpy = new UuidValidatorSpy();
    uuidFieldValidationFieldName = makeUuidFieldValidationFieldName();

    uuidFieldValidation = new UuidFieldValidation(
      uuidValidatorSpy,
      uuidFieldValidationFieldName
    );
  });

  it('should call UuidValidator once with correct values', async () => {
    const isValidSpy = jest.spyOn(uuidValidatorSpy, 'isValid');

    const uuid = faker.datatype.uuid();

    uuidFieldValidation.validate({
      [uuidFieldValidationFieldName]: `   ${uuid}     `,
    });

    expect(isValidSpy).toHaveBeenCalledWith({ uuid });
    expect(isValidSpy).toHaveBeenCalledTimes(1);
  });

  it('should return null if input value is undefined', async () => {
    const output = uuidFieldValidation.validate({
      [uuidFieldValidationFieldName]: undefined,
    });

    expect(output).toEqual(null);
  });

  it('should return null if input value is null', async () => {
    const output = uuidFieldValidation.validate({
      [uuidFieldValidationFieldName]: null,
    });

    expect(output).toEqual(null);
  });

  it('should return InvalidUuidFieldError if UuidValidator returns false', async () => {
    jest.spyOn(uuidValidatorSpy, 'isValid').mockReturnValueOnce(false);

    const output = uuidFieldValidation.validate({
      [uuidFieldValidationFieldName]: faker.datatype.uuid(),
    });

    expect(output).toEqual(
      new InvalidUuidFieldError(uuidFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = uuidFieldValidation.validate({
      [uuidFieldValidationFieldName]: faker.datatype.uuid(),
    });

    expect(output).toBeNull();
  });
});
