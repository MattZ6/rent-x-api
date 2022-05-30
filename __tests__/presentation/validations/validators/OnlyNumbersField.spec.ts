import { faker } from '@faker-js/faker';

import { OnlyNumbersFieldError } from '@presentation/errors';
import { OnlyNumbersFieldValidation } from '@presentation/validations/validators';

import { makeOnlyNumbersFieldValidationFieldName } from '../../mocks';

let onlyNumbersFieldValidationFieldName: string;

let onlyNumbersFieldValidation: OnlyNumbersFieldValidation<{
  [key: string]: string;
}>;

describe('OnlyNumbersFieldValidation', () => {
  onlyNumbersFieldValidationFieldName =
    makeOnlyNumbersFieldValidationFieldName();

  onlyNumbersFieldValidation = new OnlyNumbersFieldValidation(
    onlyNumbersFieldValidationFieldName,
    false
  );

  it('should return null if input value is undefined', async () => {
    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: undefined,
    });

    expect(output).toEqual(null);
  });

  it('should return null if input value is null', async () => {
    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: null,
    });

    expect(output).toEqual(null);
  });

  it('should return OnlyNumbersFieldError if validation fails', async () => {
    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toEqual(
      new OnlyNumbersFieldError(onlyNumbersFieldValidationFieldName)
    );
  });

  it('should return OnlyNumbersFieldError if input has numbers with dot', async () => {
    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: String(
        faker.datatype.number({
          min: 1,
          precision: 0.01,
        })
      ),
    });

    expect(output).toEqual(
      new OnlyNumbersFieldError(onlyNumbersFieldValidationFieldName)
    );
  });

  it('should return null if input has numbers without dot', async () => {
    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: String(faker.datatype.number()),
    });

    expect(output).toBeNull();
  });

  it('should return OnlyNumbersFieldError if validation fails considering dot', async () => {
    onlyNumbersFieldValidation = new OnlyNumbersFieldValidation(
      onlyNumbersFieldValidationFieldName,
      true
    );

    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toEqual(
      new OnlyNumbersFieldError(onlyNumbersFieldValidationFieldName)
    );
  });

  it('should return null if input has numbers with dot', async () => {
    onlyNumbersFieldValidation = new OnlyNumbersFieldValidation(
      onlyNumbersFieldValidationFieldName,
      true
    );

    const output = onlyNumbersFieldValidation.validate({
      [onlyNumbersFieldValidationFieldName]: String(
        faker.datatype.number({
          min: 1,
          precision: 0.01,
        })
      ),
    });

    expect(output).toBeNull();
  });
});
