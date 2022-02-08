import { ListCarSpecificationsController } from '@presentation/controllers/car/specification/ListCarSpecifications';
import { IController } from '@presentation/protocols';

import { makeListAllCarSpecificationsUseCase } from '@main/factories/usecases/car/specifications/ListAllCarSpecificationsUseCaseFactory';

export function makeListCarSpecificationsController(): IController {
  const listAllCarSpecificationsUseCase = makeListAllCarSpecificationsUseCase();

  return new ListCarSpecificationsController(
    'name',
    'ASC',
    10,
    1,
    listAllCarSpecificationsUseCase
  );
}
