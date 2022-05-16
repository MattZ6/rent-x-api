import faker from '@faker-js/faker';

import { InvalidDateIntervalFieldError } from '@presentation/errors';
import { ValidDateIntervalFieldValidation } from '@presentation/validations/validators';

import { makeValidDateIntervalFieldValidationFieldName } from '../../mocks';

let validDateIntervalFieldValidationFieldName: string;
let validDateIntervalFieldValidationFieldToCompareName: string;

let validDateIntervalFieldValidation: ValidDateIntervalFieldValidation<{
  [key: string]: string;
}>;

describe('ValidDateIntervalFieldValidation', () => {
  beforeEach(() => {
    validDateIntervalFieldValidationFieldName =
      makeValidDateIntervalFieldValidationFieldName();
    validDateIntervalFieldValidationFieldToCompareName = `${makeValidDateIntervalFieldValidationFieldName()}_x`;

    validDateIntervalFieldValidation = new ValidDateIntervalFieldValidation(
      validDateIntervalFieldValidationFieldName,
      validDateIntervalFieldValidationFieldToCompareName
    );
  });

  it('should return InvalidDateIntervalFieldError if validation fails', () => {
    const date = faker.datatype.datetime();

    const output = validDateIntervalFieldValidation.validate({
      [validDateIntervalFieldValidationFieldName]: date.toISOString(),
      [validDateIntervalFieldValidationFieldToCompareName]: date.toISOString(),
    });

    expect(output).toEqual(
      new InvalidDateIntervalFieldError(
        validDateIntervalFieldValidationFieldName,
        validDateIntervalFieldValidationFieldToCompareName
      )
    );
  });

  it('should return null if validation succeeds', () => {
    const start = faker.datatype.datetime();
    const end = new Date(start.getTime() + 1);

    const output = validDateIntervalFieldValidation.validate({
      [validDateIntervalFieldValidationFieldName]: end.toISOString(),
      [validDateIntervalFieldValidationFieldToCompareName]: start.toISOString(),
    });

    expect(output).toBeNull();
  });
});
