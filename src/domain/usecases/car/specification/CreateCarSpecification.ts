import { ICarSpecification } from '@domain/models/CarSpecification';

interface ICreateCarSpecificationUseCase {
  execute(
    data: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output>;
}

namespace ICreateCarSpecificationUseCase {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = ICarSpecification;
}

export { ICreateCarSpecificationUseCase };
