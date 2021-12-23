import { ICarSpecification } from '@domain/models/CarSpecification';

export interface IFindAllSpecificationsByIdsRepository {
  findAllByIds(ids: string[]): Promise<ICarSpecification[]>;
}
