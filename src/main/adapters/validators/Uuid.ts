import { IUuidValidator } from '@presentation/validations/protocols';

export class UuidValidatorAdapter implements IUuidValidator {
  private readonly uuidRegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  isValid(data: IUuidValidator.Input): IUuidValidator.Output {
    const { uuid } = data;

    return this.uuidRegExp.test(uuid);
  }
}
