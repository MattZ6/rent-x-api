interface ICompareHashProvider {
  compare(
    data: ICompareHashProvider.Input
  ): Promise<ICompareHashProvider.Output>;
}

namespace ICompareHashProvider {
  export type Input = {
    value: string;
    hashed_value: string;
  };

  export type Output = boolean;
}

export { ICompareHashProvider };
