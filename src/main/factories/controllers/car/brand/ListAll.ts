import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeListAllCarBrandsUseCase } from '@main/factories/usecases/car/brand/ListAll';
import { makeListAllCarBrandsControllerValidation } from '@main/factories/validators/controllers/car/brand/ListAll';

export function makeListAllCarBrandsController(): IController {
  const validation = makeListAllCarBrandsControllerValidation();
  const listAllCarBrandsUseCase = makeListAllCarBrandsUseCase();

  const controller = new ListAllCarBrandsController(
    validation,
    listAllCarBrandsUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
