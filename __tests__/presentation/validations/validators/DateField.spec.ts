import { faker } from '@faker-js/faker';

import { InvalidDateFieldError } from '@presentation/errors';
import { DateFieldValidation } from '@presentation/validations/validators';

import { makeDateFieldValidationFieldValidationFieldName } from '../../mocks';

let dateFieldValidationFieldName: string;

let dateFieldValidation: DateFieldValidation<{
  [key: string]: string;
}>;

describe('DateFieldValidation', () => {
  beforeEach(() => {
    dateFieldValidationFieldName =
      makeDateFieldValidationFieldValidationFieldName();

    dateFieldValidation = new DateFieldValidation(dateFieldValidationFieldName);
  });

  it('should return InvalidDateFieldError if validation fails', async () => {
    const output = dateFieldValidation.validate({
      [dateFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toEqual(
      new InvalidDateFieldError(dateFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = dateFieldValidation.validate({
      [dateFieldValidationFieldName]: faker.datatype.datetime().toUTCString(),
    });

    expect(output).toBeNull();
  });
});
