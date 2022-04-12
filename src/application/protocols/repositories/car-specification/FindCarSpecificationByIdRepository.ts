import { ICarSpecification } from '@domain/models/CarSpecification';

interface IFindCarSpecificationByIdRepository {
  findById(
    data: IFindCarSpecificationByIdRepository.Input
  ): Promise<IFindCarSpecificationByIdRepository.Output>;
}

namespace IFindCarSpecificationByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = ICarSpecification | undefined;
}

export { IFindCarSpecificationByIdRepository };
