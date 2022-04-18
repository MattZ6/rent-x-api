import { ListAllCarBrandsUseCase } from '@application/usecases/car/brand/ListAll';

import { makePostgresCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export function makeListAllCarBrandsUseCase() {
  const postgresCarBrandsRepository = makePostgresCarBrandsRepository();

  return new ListAllCarBrandsUseCase(postgresCarBrandsRepository);
}
