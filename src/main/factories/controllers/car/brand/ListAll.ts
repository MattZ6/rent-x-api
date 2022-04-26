import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';
import { IController } from '@presentation/protocols';

import { makeListAllCarBrandsUseCase } from '@main/factories/usecases/car/brand/ListAll';
import { makeListAllCarBrandsControllerValidation } from '@main/factories/validators/controllers/car/brand/ListAll';

export function makeListAllCarBrandsController(): IController {
  const validation = makeListAllCarBrandsControllerValidation();
  const listAllCarBrandsUseCase = makeListAllCarBrandsUseCase();

  return new ListAllCarBrandsController(validation, listAllCarBrandsUseCase);
}
