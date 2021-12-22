export interface IDeleteCarSpecificationUseCase {
  execute(
    data: IDeleteCarSpecificationUseCase.Input
  ): Promise<IDeleteCarSpecificationUseCase.Output>;
}

export namespace IDeleteCarSpecificationUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;
}
