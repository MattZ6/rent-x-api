import { ICarSpecification } from '@domain/entities/CarSpecification';

interface IFindAllSpecificationsByIdsRepository {
  findAllByIds(
    data: IFindAllSpecificationsByIdsRepository.Input
  ): Promise<IFindAllSpecificationsByIdsRepository.Output>;
}

namespace IFindAllSpecificationsByIdsRepository {
  export type Input = {
    ids: string[];
  };

  export type Output = ICarSpecification[];
}

export { IFindAllSpecificationsByIdsRepository };
