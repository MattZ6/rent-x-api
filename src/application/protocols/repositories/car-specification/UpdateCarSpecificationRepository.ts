import { ICarSpecification } from '@domain/entities/CarSpecification';

interface IUpdateCarSpecificationRepository {
  update(
    data: IUpdateCarSpecificationRepository.Input
  ): Promise<IUpdateCarSpecificationRepository.Output>;
}

namespace IUpdateCarSpecificationRepository {
  export type Input = ICarSpecification;

  export type Output = ICarSpecification;
}

export { IUpdateCarSpecificationRepository };
