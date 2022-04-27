import { InvalidUuidsListFieldError } from '@presentation/errors';
import { IValidation } from '@presentation/protocols';

export class ArrayOfUuidsFieldValidation<I = unknown>
  implements IValidation<I>
{
  private readonly UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor(private readonly fieldName: keyof I) {}

  validate(input: I) {
    if (!input[this.fieldName]) {
      return null;
    }

    const list = (input as any)[this.fieldName] as [];

    const invalid = list.some(item => !this.UUID_REGEX.test(item));

    if (invalid) {
      return new InvalidUuidsListFieldError(String(this.fieldName));
    }

    return null;
  }
}
