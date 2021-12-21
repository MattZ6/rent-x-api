import { ICarSpecification } from '@domain/models/CarSpecification';

export interface IUpdateCarSpecificationUseCase {
  execute(
    data: IUpdateCarSpecificationUseCase.Input
  ): Promise<IUpdateCarSpecificationUseCase.Output>;
}

export namespace IUpdateCarSpecificationUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = ICarSpecification;
}
