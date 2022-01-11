interface IDeleteCarSpecificationUseCase {
  execute(
    data: IDeleteCarSpecificationUseCase.Input
  ): Promise<IDeleteCarSpecificationUseCase.Output>;
}

namespace IDeleteCarSpecificationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;
}

export { IDeleteCarSpecificationUseCase };
