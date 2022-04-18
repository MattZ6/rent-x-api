import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';
import { IController } from '@presentation/protocols';

import { makeListAllCarBrandsUseCase } from '@main/factories/usecases/car/brand/ListAll';

export function makeListAllCarBrandsController(): IController {
  const listAllCarBrandsUseCase = makeListAllCarBrandsUseCase();

  return new ListAllCarBrandsController(
    'name',
    'ASC',
    10,
    1,
    listAllCarBrandsUseCase
  );
}
