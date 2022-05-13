import { ArrayOfUuidsFieldValidation } from '@presentation/validations/validators';

import { UuidValidatorAdapter } from '@main/adapters/validators/Uuid';

export function makeArrayOfUuidsFieldValidation<I = unknown>(
  fieldName: keyof I
) {
  return new ArrayOfUuidsFieldValidation<I>(
    new UuidValidatorAdapter(),
    fieldName
  );
}
