import { faker } from '@faker-js/faker';

import { RequiredFieldError } from '@presentation/errors';
import { RequiredFieldValidation } from '@presentation/validations/validators';

import { makeRequiredFieldValidationFieldName } from '../../mocks';

let requiredFieldValidationFieldName: string;

let requiredFieldValidation: RequiredFieldValidation<{
  [key: string]: string;
}>;

describe('RequiredFieldValidation', () => {
  beforeEach(() => {
    requiredFieldValidationFieldName = makeRequiredFieldValidationFieldName();

    requiredFieldValidation = new RequiredFieldValidation(
      requiredFieldValidationFieldName
    );
  });

  it('should return RequiredFieldError if validation fails', async () => {
    const output = requiredFieldValidation.validate({});

    expect(output).toEqual(
      new RequiredFieldError(requiredFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = requiredFieldValidation.validate({
      [requiredFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toBeNull();
  });
});
