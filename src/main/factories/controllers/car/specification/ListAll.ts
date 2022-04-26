import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';
import { IController } from '@presentation/protocols';

import { makeListAllCarSpecificationsUseCase } from '@main/factories/usecases/car/specifications/ListAll';
import { makeListAllCarSpecificationsControllerValidation } from '@main/factories/validators/controllers/car/specification/ListAll';

export function makeListAllCarSpecificationsController(): IController {
  const validation = makeListAllCarSpecificationsControllerValidation();
  const listAllCarSpecificationsUseCase = makeListAllCarSpecificationsUseCase();

  return new ListAllCarSpecificationsController(
    validation,
    listAllCarSpecificationsUseCase
  );
}
