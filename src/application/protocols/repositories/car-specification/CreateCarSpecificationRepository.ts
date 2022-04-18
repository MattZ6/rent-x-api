import { ICarSpecification } from '@domain/entities/CarSpecification';

interface ICreateCarSpecificationRepository {
  create(
    data: ICreateCarSpecificationRepository.Input
  ): Promise<ICreateCarSpecificationRepository.Output>;
}

namespace ICreateCarSpecificationRepository {
  export type Input = {
    name: string;
    description: string;
  };

  export type Output = ICarSpecification;
}

export { ICreateCarSpecificationRepository };
