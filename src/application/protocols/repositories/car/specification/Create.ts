import { CarSpecification } from '@domain/entities/CarSpecification';

interface ICreateCarSpecificationRepository {
  create(
    data: ICreateCarSpecificationRepository.Input
  ): Promise<ICreateCarSpecificationRepository.Output>;
}

namespace ICreateCarSpecificationRepository {
  export type Input = Pick<CarSpecification, 'name' | 'description'>;

  export type Output = CarSpecification;
}

export { ICreateCarSpecificationRepository };
