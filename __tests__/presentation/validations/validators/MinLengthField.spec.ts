import { faker } from '@faker-js/faker';

import { MinLengthFieldError } from '@presentation/errors';
import { MinLengthFieldValidation } from '@presentation/validations/validators';

import {
  makeMinLengthFieldValidationFieldName,
  makeMinLengthFieldValidationMinLength,
} from '../../mocks';

let minLengthFieldValidationFieldName: string;
let minLengthFieldValidationMinLength: number;

let minLengthFieldValidation: MinLengthFieldValidation<{
  [key: string]: string;
}>;

describe('MinLengthFieldValidation', () => {
  beforeEach(() => {
    minLengthFieldValidationMinLength = makeMinLengthFieldValidationMinLength();
    minLengthFieldValidationFieldName = makeMinLengthFieldValidationFieldName();

    minLengthFieldValidation = new MinLengthFieldValidation(
      minLengthFieldValidationFieldName,
      minLengthFieldValidationMinLength,
      false
    );
  });

  it('should return MinLengthFieldError if input is empty', async () => {
    const output = minLengthFieldValidation.validate({});

    expect(output).toEqual(
      new MinLengthFieldError(
        minLengthFieldValidationFieldName,
        minLengthFieldValidationMinLength
      )
    );
  });

  it('should return MinLengthFieldError if validation fails', async () => {
    const output = minLengthFieldValidation.validate({
      [minLengthFieldValidationFieldName]: faker.datatype.string(
        minLengthFieldValidationMinLength - 1
      ),
    });

    expect(output).toEqual(
      new MinLengthFieldError(
        minLengthFieldValidationFieldName,
        minLengthFieldValidationMinLength
      )
    );
  });

  it('should trim value if trim flag is passed', async () => {
    minLengthFieldValidation = new MinLengthFieldValidation(
      minLengthFieldValidationFieldName,
      minLengthFieldValidationMinLength,
      true
    );

    const value = `   ${faker.datatype.string(
      minLengthFieldValidationMinLength
    )}  `;

    const output = minLengthFieldValidation.validate({
      [minLengthFieldValidationFieldName]: value,
    });

    expect(output).toBeNull();
  });

  it('should return null if validation succeeds', async () => {
    const output = minLengthFieldValidation.validate({
      [minLengthFieldValidationFieldName]: faker.datatype.string(
        minLengthFieldValidationMinLength
      ),
    });

    expect(output).toBeNull();
  });
});
