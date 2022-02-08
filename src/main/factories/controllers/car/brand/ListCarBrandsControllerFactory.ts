import { ListCarBrandsController } from '@presentation/controllers/car/brand/ListCarBrands';
import { IController } from '@presentation/protocols';

import { makeListAllCarBrandsUseCase } from '@main/factories/usecases/car/brand/ListAllCarBrandsUseCaseFactory';

export function makeListCarBrandsController(): IController {
  const listAllCarBrandsUseCase = makeListAllCarBrandsUseCase();

  return new ListCarBrandsController(
    'name',
    'ASC',
    10,
    1,
    listAllCarBrandsUseCase
  );
}
