import { ICarBrand } from '@domain/models/CarBrand';

interface IFindAllCarBrandsRepository {
  findAll(
    data: IFindAllCarBrandsRepository.Input
  ): Promise<IFindAllCarBrandsRepository.Output>;
}

namespace IFindAllCarBrandsRepository {
  export type Input = {
    order_by: keyof Pick<ICarBrand, 'name' | 'created_at'>;
    order: 'ASC' | 'DESC';
    take: number;
    skip: number;
  };

  export type Output = ICarBrand[];
}

export { IFindAllCarBrandsRepository };
