import { ListAllCarsUseCase } from '@application/usecases/car/ListAll';

import { carConfig } from '@main/config/environment/carConfig';
import { makePostgresCarsRepository } from '@main/factories/repositories/Car';

export function makeListAllCarsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new ListAllCarsUseCase(
    carConfig.DEFAULT_SORT_BY,
    carConfig.DEFAULT_ORDER_BY,
    carConfig.DEFAULT_LIMIT,
    carConfig.DEFAULT_OFFSET,
    postgresCarsRepository
  );
}
