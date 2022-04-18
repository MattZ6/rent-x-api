import { ICarSpecification } from '@domain/entities/CarSpecification';

interface IUpdateCarSpecificationUseCase {
  execute(
    data: IUpdateCarSpecificationUseCase.Input
  ): Promise<IUpdateCarSpecificationUseCase.Output>;
}

namespace IUpdateCarSpecificationUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = ICarSpecification;
}

export { IUpdateCarSpecificationUseCase };
