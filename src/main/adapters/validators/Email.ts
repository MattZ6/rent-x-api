import { IEmailValidator } from '@presentation/validations/protocols';

export class EmailValidatorAdapter implements IEmailValidator {
  private readonly emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  isValid(data: IEmailValidator.Input): IEmailValidator.Output {
    const { email } = data;

    return this.emailRegex.test(email);
  }
}
