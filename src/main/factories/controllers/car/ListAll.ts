import { ListAllCarsController } from '@presentation/controllers/car/ListAll';
import { IController } from '@presentation/protocols';

import { makeListAllCarsUseCase } from '@main/factories/usecases/car/ListAll';

export function makeListCarsController(): IController {
  const listAllCarsUseCase = makeListAllCarsUseCase();

  return new ListAllCarsController(
    'created_at',
    'DESC',
    10,
    1,
    listAllCarsUseCase
  );
}
