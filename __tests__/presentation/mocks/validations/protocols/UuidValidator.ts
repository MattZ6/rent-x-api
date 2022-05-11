import { IUuidValidator } from '@presentation/validations/protocols';

export class UuidValidatorSpy implements IUuidValidator {
  isValid(_: IUuidValidator.Input): IUuidValidator.Output {
    return true;
  }
}
