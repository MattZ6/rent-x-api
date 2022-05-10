import { UuidFieldValidation } from '@presentation/validations/validators';

import { UuidValidatorAdapter } from '@main/adapters/validators/Uuid';

export function makeUuidFieldValidation<I = unknown>(fieldName: keyof I) {
  return new UuidFieldValidation<I>(new UuidValidatorAdapter(), fieldName);
}
