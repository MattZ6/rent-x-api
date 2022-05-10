import { MinValueFieldError } from '@presentation/errors';
import { MinValueFieldValidation } from '@presentation/validations/validators';

import {
  makeMinValueFieldValidationFieldName,
  makeMinValueFieldValidationMinValue,
} from '../../mocks';

let minValueFieldValidationFieldName: string;
let minValueFieldValidationMinValue: number;

let minValueFieldValidation: MinValueFieldValidation<{
  [key: string]: string;
}>;

describe('MinValueFieldValidation', () => {
  beforeEach(() => {
    minValueFieldValidationFieldName = makeMinValueFieldValidationFieldName();
    minValueFieldValidationMinValue = makeMinValueFieldValidationMinValue();

    minValueFieldValidation = new MinValueFieldValidation(
      minValueFieldValidationFieldName,
      minValueFieldValidationMinValue
    );
  });

  it('should return null if input is empty', async () => {
    const output = minValueFieldValidation.validate({});

    expect(output).toBeNull();
  });

  it('should return null if input key does not have value', async () => {
    const output = minValueFieldValidation.validate({
      [minValueFieldValidationFieldName]: '',
    });

    expect(output).toBeNull();
  });

  it('should return MinValueFieldError if validation fails', async () => {
    const output = minValueFieldValidation.validate({
      [minValueFieldValidationFieldName]: String(
        minValueFieldValidationMinValue - 1
      ),
    });

    expect(output).toBeInstanceOf(MinValueFieldError);
  });

  it('should return null if validation succeeds', async () => {
    const output = minValueFieldValidation.validate({
      [minValueFieldValidationFieldName]: String(
        minValueFieldValidationMinValue
      ),
    });

    expect(output).toBeNull();
  });
});
