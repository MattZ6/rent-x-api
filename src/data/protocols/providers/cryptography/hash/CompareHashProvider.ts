interface ICompareHashProvider {
  compare(
    data: ICompareHashProvider.Input
  ): Promise<ICompareHashProvider.Output>;
}

namespace ICompareHashProvider {
  export type Input = {
    value: string;
    value_to_compare: string;
  };

  export type Output = boolean;
}

export { ICompareHashProvider };
