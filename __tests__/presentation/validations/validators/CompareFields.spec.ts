import faker from '@faker-js/faker';

import { DivergentFieldsValuesError } from '@presentation/errors';
import { CompareFieldsValidation } from '@presentation/validations/validators';

import {
  makeCompareFieldsValidationFieldName,
  makeCompareFieldsValidationFieldToCompareName,
} from '../../mocks';

let compareFieldsValidationFieldName: string;
let compareFieldsValidationFieldToCompareName: string;

let compareFieldsValidation: CompareFieldsValidation<{
  [key: string]: string;
}>;

describe('CompareFieldsValidation', () => {
  beforeEach(() => {
    compareFieldsValidationFieldName = makeCompareFieldsValidationFieldName();
    compareFieldsValidationFieldToCompareName =
      makeCompareFieldsValidationFieldToCompareName();

    compareFieldsValidation = new CompareFieldsValidation(
      compareFieldsValidationFieldName,
      compareFieldsValidationFieldToCompareName
    );
  });

  it('should return DivergentFieldsValuesError if validation fails', async () => {
    const output = compareFieldsValidation.validate({
      [compareFieldsValidationFieldName]: faker.datatype.string(),
      [compareFieldsValidationFieldToCompareName]: faker.datatype.string(),
    });

    expect(output).toEqual(
      new DivergentFieldsValuesError(
        compareFieldsValidationFieldName,
        compareFieldsValidationFieldToCompareName
      )
    );
  });

  it('should return null if validation succeeds', async () => {
    const value = faker.datatype.string();

    const output = compareFieldsValidation.validate({
      [compareFieldsValidationFieldName]: value,
      [compareFieldsValidationFieldToCompareName]: value,
    });

    expect(output).toBeNull();
  });
});
