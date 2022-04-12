import { ICarSpecification } from '@domain/models/CarSpecification';

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
