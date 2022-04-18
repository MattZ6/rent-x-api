import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';
import { IController } from '@presentation/protocols';

import { makeListAllCarSpecificationsUseCase } from '@main/factories/usecases/car/specifications/ListAll';

export function makeListAllCarSpecificationsController(): IController {
  const listAllCarSpecificationsUseCase = makeListAllCarSpecificationsUseCase();

  return new ListAllCarSpecificationsController(
    'name',
    'ASC',
    10,
    1,
    listAllCarSpecificationsUseCase
  );
}
