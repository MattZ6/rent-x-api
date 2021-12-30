import { ListAllCarBrandsUseCase } from '@data/usecases/car/brand/ListAllCarBrands';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/PostgresCarBrandsRepositoryFactory';

export function makeListAllCarBrandsUseCase() {
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();

  return new ListAllCarBrandsUseCase(postgresCarBrandsRepository);
}
