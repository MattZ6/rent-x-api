import { ICarSpecification } from '@domain/models/CarSpecification';

export interface ICreateCarSpecificationUseCase {
  execute(
    data: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output>;
}

export namespace ICreateCarSpecificationUseCase {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = ICarSpecification;
}
