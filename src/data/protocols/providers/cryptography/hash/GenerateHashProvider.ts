interface IGenerateHashProvider {
  hash(
    data: IGenerateHashProvider.Input
  ): Promise<IGenerateHashProvider.Output>;
}

namespace IGenerateHashProvider {
  export type Input = {
    value: string;
  };

  export type Output = string;
}

export { IGenerateHashProvider };
