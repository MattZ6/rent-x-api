import { ICarSpecification } from '@domain/models/CarSpecification';

export interface IFindCarSpecificationByIdRepository {
  findById(id: string): Promise<ICarSpecification | undefined>;
}
