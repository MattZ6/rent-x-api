import { ICarBrand } from '@domain/models/CarBrand';

export type CreateCarBrandDTO = {
  name: string;
};

export interface ICreateCarBrandRepository {
  create(data: CreateCarBrandDTO): Promise<ICarBrand>;
}
