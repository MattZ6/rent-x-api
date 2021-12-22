import { ICarBrand } from '@domain/models/CarBrand';

export interface IUpdateCarBrandRepository {
  update(data: ICarBrand): Promise<ICarBrand>;
}
