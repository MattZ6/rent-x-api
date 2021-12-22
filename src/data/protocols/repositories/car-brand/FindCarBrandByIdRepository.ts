import { ICarBrand } from '@domain/models/CarBrand';

export interface IFindCarBrandByIdRepository {
  findById(id: string): Promise<ICarBrand | undefined>;
}
