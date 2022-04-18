import { UpdateCarBrandUseCase } from '@application/usecases/car/brand/Update';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export function makeUpdateCarBrandUseCase() {
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();

  return new UpdateCarBrandUseCase(
    postgresCarBrandsRepository,
    postgresCarBrandsRepository,
    postgresCarBrandsRepository
  );
}
