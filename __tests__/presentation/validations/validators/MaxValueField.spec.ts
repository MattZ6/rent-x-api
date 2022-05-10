import { MaxValueFieldError } from '@presentation/errors';
import { MaxValueFieldValidation } from '@presentation/validations/validators';

import {
  makeMaxValueFieldValidationFieldName,
  makeMaxValueFieldValidationMaxValue,
} from '../../mocks';

let maxValueFieldValidationFieldName: string;
let maxValueFieldValidationMaxValue: number;

let maxValueFieldValidation: MaxValueFieldValidation<{
  [key: string]: string;
}>;

describe('MaxValueFieldValidation', () => {
  beforeEach(() => {
    maxValueFieldValidationFieldName = makeMaxValueFieldValidationFieldName();
    maxValueFieldValidationMaxValue = makeMaxValueFieldValidationMaxValue();

    maxValueFieldValidation = new MaxValueFieldValidation(
      maxValueFieldValidationFieldName,
      maxValueFieldValidationMaxValue
    );
  });

  it('should return null if input is empty', async () => {
    const output = maxValueFieldValidation.validate({});

    expect(output).toBeNull();
  });

  it('should return null if input key does not have value', async () => {
    const output = maxValueFieldValidation.validate({
      [maxValueFieldValidationFieldName]: '',
    });

    expect(output).toBeNull();
  });

  it('should return MaxValueFieldError if validation fails', async () => {
    const output = maxValueFieldValidation.validate({
      [maxValueFieldValidationFieldName]: String(
        maxValueFieldValidationMaxValue + 1
      ),
    });

    expect(output).toBeInstanceOf(MaxValueFieldError);
  });

  it('should return null if validation succeeds', async () => {
    const output = maxValueFieldValidation.validate({
      [maxValueFieldValidationFieldName]: String(
        maxValueFieldValidationMaxValue
      ),
    });

    expect(output).toBeNull();
  });
});
