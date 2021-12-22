import { ICarBrand } from '@domain/models/CarBrand';

export interface ICheckIfCarBrandByNameRepository {
  findByName(name: string): Promise<ICarBrand | undefined>;
}
