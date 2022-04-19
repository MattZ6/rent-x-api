import { CarBrand } from '@domain/entities/CarBrand';

interface IFindAllCarBrandsRepository {
  findAll(
    data: IFindAllCarBrandsRepository.Input
  ): Promise<IFindAllCarBrandsRepository.Output>;
}

namespace IFindAllCarBrandsRepository {
  export type SortBy = keyof Pick<CarBrand, 'name' | 'updated_at'>;
  export type OrderBy = 'asc' | 'desc';
  export type Take = number;
  export type Skip = number;

  export type Input = {
    sort_by: SortBy;
    order_by: OrderBy;
    take: Take;
    skip: Skip;
  };

  export type Output = CarBrand[];
}

export { IFindAllCarBrandsRepository };
