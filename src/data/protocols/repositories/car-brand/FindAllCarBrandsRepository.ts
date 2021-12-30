import { ICarBrand } from '@domain/models/CarBrand';

export type FindAllCarBrandsDTO = {
  order_by: keyof Pick<ICarBrand, 'name' | 'created_at'>;
  order: 'ASC' | 'DESC';
  take: number;
  skip: number;
};

export interface IFindAllCarBrandsRepository {
  findAll(data: FindAllCarBrandsDTO): Promise<ICarBrand[]>;
}
