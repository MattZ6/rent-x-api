import { CarSpecification } from '@domain/entities/CarSpecification';

interface IDeleteCarSpecificationByIdRepository {
  deleteById(
    data: IDeleteCarSpecificationByIdRepository.Input
  ): Promise<IDeleteCarSpecificationByIdRepository.Output>;
}

namespace IDeleteCarSpecificationByIdRepository {
  export type Input = Pick<CarSpecification, 'id'>;

  export type Output = void;
}

export { IDeleteCarSpecificationByIdRepository };
