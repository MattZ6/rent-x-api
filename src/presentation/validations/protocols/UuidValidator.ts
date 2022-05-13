interface IUuidValidator {
  isValid(data: IUuidValidator.Input): IUuidValidator.Output;
}

namespace IUuidValidator {
  export type Input = {
    uuid: string;
  };

  export type Output = boolean;
}

export { IUuidValidator };
