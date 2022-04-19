interface IEncryptProvider<P = unknown> {
  encrypt(data: IEncryptProvider.Input<P>): Promise<IEncryptProvider.Output>;
}

namespace IEncryptProvider {
  export type Input<P> = {
    subject: string;
    payload?: P;
  };

  export type Output = string;
}

export { IEncryptProvider };
