import { CarSpecification } from '@domain/entities/CarSpecification';

interface IFindCarSpecificationByIdRepository {
  findById(
    data: IFindCarSpecificationByIdRepository.Input
  ): Promise<IFindCarSpecificationByIdRepository.Output>;
}

namespace IFindCarSpecificationByIdRepository {
  export type Input = Pick<CarSpecification, 'id'>;

  export type Output = CarSpecification | null;
}

export { IFindCarSpecificationByIdRepository };
