import { CarSpecification } from '@domain/entities/CarSpecification';

interface ICreateCarSpecificationUseCase {
  execute(
    data: ICreateCarSpecificationUseCase.Input
  ): Promise<ICreateCarSpecificationUseCase.Output>;
}

namespace ICreateCarSpecificationUseCase {
  export type Input = Pick<CarSpecification, 'name' | 'description'>;

  export type Output = CarSpecification;
}

export { ICreateCarSpecificationUseCase };
