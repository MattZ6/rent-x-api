import { CarSpecification } from '@domain/entities/CarSpecification';

interface IFindAllSpecificationsByIdsRepository {
  findAllByIds(
    data: IFindAllSpecificationsByIdsRepository.Input
  ): Promise<IFindAllSpecificationsByIdsRepository.Output>;
}

namespace IFindAllSpecificationsByIdsRepository {
  export type Input = {
    ids: string[];
  };

  export type Output = CarSpecification[];
}

export { IFindAllSpecificationsByIdsRepository };
