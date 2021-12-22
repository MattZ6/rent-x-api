import { ICarCategory } from '@domain/models/CarCategory';

export interface IFindCarCategoryByIdRepository {
  findById(id: string): Promise<ICarCategory | undefined>;
}
