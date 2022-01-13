interface IEncryptProvider {
  encrypt(data: IEncryptProvider.Input): Promise<IEncryptProvider.Output>;
}

namespace IEncryptProvider {
  export type Input = {
    value: string;
  };

  export type Output = string;
}

export { IEncryptProvider };
