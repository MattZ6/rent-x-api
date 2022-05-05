import { ListAllCarBrandsUseCase } from '@application/usecases/car/brand/ListAll';

import { carBrandConfig } from '@main/config/environment/carBrand';
import { makeCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export function makeListAllCarBrandsUseCase() {
  const carBrandsRepository = makeCarBrandsRepository();

  return new ListAllCarBrandsUseCase(
    carBrandConfig.DEFAULT_SORT_BY,
    carBrandConfig.DEFAULT_ORDER_BY,
    carBrandConfig.DEFAULT_LIMIT,
    carBrandConfig.DEFAULT_OFFSET,
    carBrandsRepository
  );
}
