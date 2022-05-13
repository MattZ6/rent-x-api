interface IEmailValidator {
  isValid(data: IEmailValidator.Input): IEmailValidator.Output;
}

namespace IEmailValidator {
  export type Input = {
    email: string;
  };

  export type Output = boolean;
}

export { IEmailValidator };
