import { faker } from '@faker-js/faker';

import { InvalidUuidsListFieldError } from '@presentation/errors';
import { ArrayOfUuidsFieldValidation } from '@presentation/validations/validators';

import {
  UuidValidatorSpy,
  makeArrayOfUuidsFieldValidationFieldName,
} from '../../mocks';

let uuidValidatorSpy: UuidValidatorSpy;
let arrayOfUuidsFieldValidationFieldName: string;

let arrayOfUuidsFieldValidation: ArrayOfUuidsFieldValidation<{
  [key: string]: string | string[];
}>;

describe('ArrayOfUuidsFieldValidation', () => {
  beforeEach(() => {
    uuidValidatorSpy = new UuidValidatorSpy();
    arrayOfUuidsFieldValidationFieldName =
      makeArrayOfUuidsFieldValidationFieldName();

    arrayOfUuidsFieldValidation = new ArrayOfUuidsFieldValidation(
      uuidValidatorSpy,
      arrayOfUuidsFieldValidationFieldName
    );
  });

  it('should call UuidValidator once with correct values', async () => {
    const isValidSpy = jest.spyOn(uuidValidatorSpy, 'isValid');

    const uuid = faker.datatype.uuid();

    arrayOfUuidsFieldValidation.validate({
      [arrayOfUuidsFieldValidationFieldName]: [`   ${uuid}     `],
    });

    expect(isValidSpy).toHaveBeenCalledWith({ uuid });
    expect(isValidSpy).toHaveBeenCalledTimes(1);
  });

  it('should return InvalidUuidsListFieldError if UuidValidator returns false', async () => {
    jest.spyOn(uuidValidatorSpy, 'isValid').mockReturnValueOnce(false);

    const output = arrayOfUuidsFieldValidation.validate({
      [arrayOfUuidsFieldValidationFieldName]: [faker.datatype.string()],
    });

    expect(output).toEqual(
      new InvalidUuidsListFieldError(arrayOfUuidsFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = arrayOfUuidsFieldValidation.validate({
      [arrayOfUuidsFieldValidationFieldName]: [
        faker.datatype.uuid(),
        faker.datatype.uuid(),
      ],
    });

    expect(output).toBeNull();
  });
});
