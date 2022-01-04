import { ListCarsController } from '@presentation/controllers/car/ListCars';
import { IController } from '@presentation/protocols';

import { makeListAllCarsUseCase } from '@main/factories/usecases/car/ListAllCarsUseCaseFactory';

export function makeListCarsController(): IController {
  const listAllCarsUseCase = makeListAllCarsUseCase();

  return new ListCarsController(
    'created_at',
    'DESC',
    10,
    1,
    listAllCarsUseCase
  );
}
