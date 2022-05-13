import { faker } from '@faker-js/faker';

import { IsNotOneOfValuesFieldError } from '@presentation/errors';
import { OneOfValuesFieldValidation } from '@presentation/validations/validators';

import {
  makeOneOfValuesFieldValidationFieldName,
  makeOneOfValuesFieldValidationValues,
} from '../../mocks';

let oneOfValuesFieldValidationFieldName: string;
let oneOfValuesFieldValidationValues: string[];

let oneOfValuesFieldValidation: OneOfValuesFieldValidation<
  { [key: string]: string },
  string
>;

describe('OneOfValuesFieldValidation', () => {
  beforeEach(() => {
    oneOfValuesFieldValidationFieldName =
      makeOneOfValuesFieldValidationFieldName();
    oneOfValuesFieldValidationValues = makeOneOfValuesFieldValidationValues();

    oneOfValuesFieldValidation = new OneOfValuesFieldValidation(
      oneOfValuesFieldValidationFieldName,
      oneOfValuesFieldValidationValues
    );
  });

  it('should return null if input is undefined', async () => {
    const output = oneOfValuesFieldValidation.validate({
      [oneOfValuesFieldValidationFieldName]: undefined,
    });

    expect(output).toBeNull();
  });

  it('should return null if input is null', async () => {
    const output = oneOfValuesFieldValidation.validate({
      [oneOfValuesFieldValidationFieldName]: null,
    });

    expect(output).toBeNull();
  });

  it('should return IsNotOneOfValuesFieldError if validation fails', async () => {
    const output = oneOfValuesFieldValidation.validate({
      [oneOfValuesFieldValidationFieldName]: faker.datatype.string(),
    });

    expect(output).toEqual(
      new IsNotOneOfValuesFieldError(
        oneOfValuesFieldValidationFieldName,
        oneOfValuesFieldValidationValues
      )
    );
  });

  it('should return null if validation succeeds', async () => {
    const value = faker.datatype.string();

    oneOfValuesFieldValidationValues.push(value);

    const output = oneOfValuesFieldValidation.validate({
      [oneOfValuesFieldValidationFieldName]: value,
    });

    expect(output).toBeNull();
  });
});
