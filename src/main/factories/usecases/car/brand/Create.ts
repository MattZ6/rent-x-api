import { CreateCarBrandUseCase } from '@application/usecases/car/brand/Create';

import { makeCarBrandsRepository } from '@main/factories/repositories/CarBrand';

export function makeCreateCarBrandUseCase() {
  const carBrandsRepository = makeCarBrandsRepository();

  return new CreateCarBrandUseCase(carBrandsRepository, carBrandsRepository);
}
