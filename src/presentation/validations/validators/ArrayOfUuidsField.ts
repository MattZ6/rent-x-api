import { InvalidUuidsListFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

import { IUuidValidator } from '../protocols';

export class ArrayOfUuidsFieldValidation<I = unknown>
  implements IValidation<I>
{
  constructor(
    private readonly uuidValidator: IUuidValidator,
    private readonly fieldName: keyof I
  ) {}

  validate(input: I) {
    const isValid = ((input as unknown)[this.fieldName] as []).every(item =>
      this.uuidValidator.isValid({ uuid: String(item).trim() })
    );

    if (!isValid) {
      return new InvalidUuidsListFieldError(String(this.fieldName));
    }

    return null;
  }
}
