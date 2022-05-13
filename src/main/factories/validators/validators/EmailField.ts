import { EmailFieldValidation } from '@presentation/validations/validators';

import { EmailValidatorAdapter } from '@main/adapters/validators/Email';

export function makeEmailFieldValidation<I = unknown>(fieldName: keyof I) {
  return new EmailFieldValidation<I>(new EmailValidatorAdapter(), fieldName);
}
