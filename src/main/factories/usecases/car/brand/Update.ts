import { UpdateCarBrandUseCase } from '@application/usecases/car/brand/Update';

import { makeCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export function makeUpdateCarBrandUseCase() {
  const carBrandsRepository = makeCarBrandsRepository();

  return new UpdateCarBrandUseCase(
    carBrandsRepository,
    carBrandsRepository,
    carBrandsRepository
  );
}
