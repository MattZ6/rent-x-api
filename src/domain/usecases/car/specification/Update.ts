import { CarSpecification } from '@domain/entities/CarSpecification';

interface IUpdateCarSpecificationUseCase {
  execute(
    data: IUpdateCarSpecificationUseCase.Input
  ): Promise<IUpdateCarSpecificationUseCase.Output>;
}

namespace IUpdateCarSpecificationUseCase {
  export type Input = Pick<
    Partial<CarSpecification>,
    'name' | 'description'
  > & {
    id: string;
  };

  export type Output = CarSpecification;
}

export { IUpdateCarSpecificationUseCase };
