import { ICarCategory } from '@domain/models/CarCategory';

export interface IUpdateCarCategoryRepository {
  update(data: ICarCategory): Promise<ICarCategory>;
}
