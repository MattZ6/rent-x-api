import { CreateCarBrandUseCase } from '@application/usecases/car/brand/Create';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export function makeCreateCarBrandUseCase() {
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();

  return new CreateCarBrandUseCase(
    postgresCarBrandsRepository,
    postgresCarBrandsRepository
  );
}
