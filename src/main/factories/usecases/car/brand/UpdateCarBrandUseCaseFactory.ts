import { UpdateCarBrandUseCase } from '@application/usecases/car/brand/UpdateCarBrand';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/PostgresCarBrandsRepositoryFactory';

export function makeUpdateCarBrandUseCase() {
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();

  return new UpdateCarBrandUseCase(
    postgresCarBrandsRepository,
    postgresCarBrandsRepository,
    postgresCarBrandsRepository
  );
}
