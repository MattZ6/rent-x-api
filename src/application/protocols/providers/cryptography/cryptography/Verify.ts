interface IVerifyCriptographyProvider {
  verify<T = unknown>(
    data: IVerifyCriptographyProvider.Input
  ): Promise<IVerifyCriptographyProvider.Output<T>>;
}

namespace IVerifyCriptographyProvider {
  export type Input = {
    value: string;
  };

  export type Output<P = unknown> = {
    subject: string;
    payload: P;
  };
}

export { IVerifyCriptographyProvider };
