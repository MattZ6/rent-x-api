import { faker } from '@faker-js/faker';

import { InvalidEmailFieldError } from '@presentation/errors';
import { EmailFieldValidation } from '@presentation/validations/validators';

import {
  EmailValidatorSpy,
  makeEmailFieldValidationFieldName,
} from '../../mocks';

let emailValidatorSpy: EmailValidatorSpy;
let emailFieldValidationFieldName: string;

let emailFieldValidation: EmailFieldValidation<{
  [key: string]: string;
}>;

describe('EmailFieldValidation', () => {
  beforeEach(() => {
    emailValidatorSpy = new EmailValidatorSpy();
    emailFieldValidationFieldName = makeEmailFieldValidationFieldName();

    emailFieldValidation = new EmailFieldValidation(
      emailValidatorSpy,
      emailFieldValidationFieldName
    );
  });

  it('should call EmailValidator once with correct values', async () => {
    const isValidSpy = jest.spyOn(emailValidatorSpy, 'isValid');

    const email = faker.internet.email();

    emailFieldValidation.validate({
      [emailFieldValidationFieldName]: `   ${email}     `,
    });

    expect(isValidSpy).toHaveBeenCalledWith({ email });
    expect(isValidSpy).toHaveBeenCalledTimes(1);
  });

  it('should return null if input value is undefined', async () => {
    const output = emailFieldValidation.validate({
      [emailFieldValidationFieldName]: undefined,
    });

    expect(output).toEqual(null);
  });

  it('should return null if input value is null', async () => {
    const output = emailFieldValidation.validate({
      [emailFieldValidationFieldName]: null,
    });

    expect(output).toEqual(null);
  });

  it('should return InvalidEmailFieldError if EmailValidator returns false', async () => {
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false);

    const output = emailFieldValidation.validate({
      [emailFieldValidationFieldName]: faker.internet.email(),
    });

    expect(output).toEqual(
      new InvalidEmailFieldError(emailFieldValidationFieldName)
    );
  });

  it('should return null if validation succeeds', async () => {
    const output = emailFieldValidation.validate({
      [emailFieldValidationFieldName]: faker.internet.email(),
    });

    expect(output).toBeNull();
  });
});
