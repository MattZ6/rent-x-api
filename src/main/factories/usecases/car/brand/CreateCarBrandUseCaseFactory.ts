import { CreateCarBrandUseCase } from '@data/usecases/car/brand/CreateCarBrand';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/PostgresCarBrandsRepositoryFactory';

export function makeCreateCarBrandUseCase() {
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();

  return new CreateCarBrandUseCase(
    postgresCarBrandsRepository,
    postgresCarBrandsRepository
  );
}